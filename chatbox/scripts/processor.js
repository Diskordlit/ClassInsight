import { formatTimestamp, convertToAudio, getVideoDuration, setLoadingMessage, formatConversation, isCloseNeedTranscribeSection, showNeedTranscribeWithDelay } from "./utils";
import { sendTranscript } from "./gpt";
import { transcribeAudio, getTranscriptResults } from "./speech";
import { getTranscript, saveTranscript } from "./database";
import { addSystemPrompt } from "./input.js";

const startConversation = (status) => {
    const noNeedTranscribe = document.querySelector(".no-transcribe");
    const needTranscribe = document.querySelector(".need-transcribe");

    if (status === "success") {
        noNeedTranscribe.style.display = "flex";
        needTranscribe.style.display = "none";
        addSystemPrompt("Hello there! What would you like to know about the video?");
    } else {
        alert("Something Went Wrong!");
    }
}

// Transcribe video starts (detected when btn-transcribe is clicked)
export const transcribeVideo = () => {
    // Flow: Transcribe Video --> Pass in Context to StartConversation --> Start Displaying
    const needTranscribe = document.querySelector(".need-transcribe");
    const loading = document.getElementById("loading");

    chrome.storage.session.get("videoLink").then(async ({ videoLink }) => {
        needTranscribe.style.display = "none";
        loading.style.display = "flex";
        setLoadingMessage("pending", "No Transcripts found, checking if transcript exists..."); //Check if Transcript exists.
        let transcript = await getTranscript(videoLink);

        if (!transcript) {
            setLoadingMessage("pending", "No existing Transcripts found, fetching video...");
            fetch(videoLink)
                .then((response) => response.blob()) // Fetch the video content
                .then(async (videoBlob) => {
                    try {
                        const duration = await getVideoDuration(videoBlob);

                        if (duration <= 1800) {
                            setLoadingMessage("pending", "Converting video to audio format...");
                            const audioFile = await convertToAudio(videoBlob);
                            setLoadingMessage("pending", "Uploading the audio file...");
                            const uploadAudioFile = await transcribeAudio(audioFile, duration);
                            if (uploadAudioFile == "Audio File Received") {
                                setLoadingMessage("pending", "Transcribing the audio file...");
                                setTimeout(async () => {
                                    const newTranscript = await getTranscriptResults();

                                    if (newTranscript) {
                                        await saveTranscript(videoLink, newTranscript);
                                        setLoadingMessage("success", "Successfully Transcribed, Sending context to ClassInsight...");
                                        sendTranscript(newTranscript); //remove loading and everything show Conversation.
                                        setLoadingMessage("success", "Starting Conversation...");
                                        setTimeout(() => {
                                            startConversation("success");
                                        }, 3000);
                                    } else {
                                        setLoadingMessage("error", "The transcription failed, please try again later.");
                                        showNeedTranscribeWithDelay();
                                    }
                                }, duration * 1000);
                            } else {
                                setLoadingMessage("error", "The audio file upload failed, please try again later.");
                                showNeedTranscribeWithDelay();
                            }
                        } else {
                            setLoadingMessage("error", "The video's duration is longer than 30 minutes, not transcribable!");
                            showNeedTranscribeWithDelay();
                        }
                    } catch (error) {
                        console.error('Error:', error.message);
                        setLoadingMessage("error", "The video is unfetchable, try other videos.");
                        showNeedTranscribeWithDelay();
                    }
                })
                .catch((error) => {
                    console.error('Error:', error);
                    setLoadingMessage("error", "The video is unfetchable, try other videos.");
                    showNeedTranscribeWithDelay();
                });
        } else {
            sendTranscript(transcript.transcript); //remove loading and everything show Conversation.
            setLoadingMessage("success", "Starting Conversation...");
            setTimeout(() => {
                startConversation("success");
            }, 3000);
        }
    });

}

// Handle video transcript (automatically from video link if detectable) (if not click on the btn-transcribe)
export const handleTranscriptFromVideoLink = (videoTranscriptLinkElement) => {
    console.log(videoTranscriptLinkElement);
    if (!videoTranscriptLinkElement) {
        isCloseNeedTranscribeSection(false);
    } else {
        isCloseNeedTranscribeSection(true);
        setLoadingMessage("pending", "Fetching existing transcript for context...");
        setTimeout(() => {
            videoTranscriptLinkElement = videoTranscriptLinkElement.substring(0, videoTranscriptLinkElement.indexOf("streamContent") + "streamContent".length) + "?format=json&applymediaedits=false";

            fetch(videoTranscriptLinkElement)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error(`Network response was not ok: ${response.status}`);
                    }
                    return response.json(); // Parse the response as JSON
                })
                .then(async (jsonData) => {
                    // Once you have the JSON data, you can process it as shown in the previous example
                    const filteredEntries = [];
                    for (const entry of jsonData.entries) {
                        const { text, startOffset } = entry;
                        const formattedTimestamp = formatTimestamp(startOffset);
                        const filteredEntry = { text, timestamp: formattedTimestamp };
                        filteredEntries.push(filteredEntry);
                    }
                    // Now, you can work with the filteredEntries array
                    console.log(filteredEntries);
                    sendTranscript(filteredEntries);
                })
                .catch((error) => {
                    console.error(`Fetch error: ${error}`);
                });

            setLoadingMessage("success", "Starting Conversation...");
            setTimeout(() => {
                startConversation("success");
            }, 3000);
        }, 3000);
    }
}

export const exportConversation = async () => {

    //Formatting additional content
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    let tabTitle = tab.title;
    let tabUrl = tab.url;

    var title = "<h1 style='text-align: center;'>ClassInsight Notes</h1>";
    var videoTitle = `<p style='text-align: left;'><b>Video:</b> <a href="${tabUrl}">${tabTitle}</a></p>`;
    var conversationSeparator = `<h1 style='text-align: left; text-decoration: underline;'>Conversation</h1>`;
    var conversation = formatConversation();

    var content = title + "</br>" + videoTitle + conversationSeparator + conversation;

    //Main Code for Exporting
    var header = "<html xmlns:o='urn:schemas-microsoft-com:office:office' " +
        "xmlns:w='urn:schemas-microsoft-com:office:word' " +
        "xmlns='http://www.w3.org/TR/REC-html40'>" +
        "<head><meta charset='utf-8'><title>Export HTML to Word Document with JavaScript</title></head><body>";
    var footer = "</body></html>";
    var sourceHTML = header + content + footer;

    var source = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(sourceHTML);
    var fileDownload = document.createElement("a");
    document.body.appendChild(fileDownload);
    fileDownload.href = source;
    fileDownload.download = 'classinsight-notes.doc';
    fileDownload.click();
    document.body.removeChild(fileDownload);
}