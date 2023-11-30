import { formatTimestamp, convertToAudio, getVideoDuration, setLoadingMessage, turnOffLoadingMessage, isCloseNeedTranscribeSection } from "./utils";
import { sendTranscript } from "./gpt";
import { transcribeAudio } from "./speech";
import { getTranscript, saveTranscript } from "./database";
import { addSystemPrompt } from "./input.js";

const startConversation = (status) => {
    const noNeedTranscribe = document.querySelector(".no-transcribe");
    const needTranscribe = document.querySelector(".need-transcribe");

    if (status === "success") {
        noNeedTranscribe.style.display = "block";
        needTranscribe.style.display = "none";
        addSystemPrompt("Hello there! What would you like to know about the video?");
    } else {
        alert("Something Went Wrong!");
    }
}

// Transcribe video starts (detected when btn-transcribe is clicked)
export const transcribeVideo = () => {
    // Flow: Transcribe Video --> Pass in Context to StartConversation --> Start Displaying
    const transcribeBtn = document.getElementById("transcribeBtn");
    const missingTranscribeMsg = document.getElementById("missing-transcript-msg");

    chrome.storage.session.get("videoLink").then(async ({ videoLink }) => {
        transcribeBtn.style.display = "none";
        missingTranscribeMsg.style.display = "none";
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
                            setLoadingMessage("pending", "Transcribing the audio file...");
                            const newTranscript = await transcribeAudio(audioFile, duration);
                            await saveTranscript(videoLink, newTranscript);
                            setLoadingMessage("success", "Starting Conversation...");
                            sendTranscript(newTranscript); //remove loading and everything show Conversation.
                            turnOffLoadingMessage();
                            startConversation("success");
                        } else {
                            alert("The video's duration is longer than 30 minutes, not transcribable!");
                        }
                    } catch (error) {
                        console.error('Error:', error.message);
                    }
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        } else {
            sendTranscript(transcript.transcript); //remove loading and everything show Conversation.
            turnOffLoadingMessage();
            startConversation("success");
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

export const shareConversation = () => {

}