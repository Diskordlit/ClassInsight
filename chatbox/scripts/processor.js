import { formatTimestamp, convertToAudio, getVideoDuration, setLoadingMessage, turnOffLoadingMessage, isCloseNeedTranscribeSection } from "./utils";
import { sendTranscript } from "./gpt";
import { transcribeAudio } from "./speech";
import { addSystemPrompt } from "./input.js";
import { saveTranscript } from "./database.js";

export function startConversation() {
    const noTranscribe = document.querySelector(".chatbox-container");
    const status = "success";

    if (status === "success") {
        noTranscribe.style.display = "block";
        addSystemPrompt("Hello there! What would you like to know about the video?");
    } else {
        alert("Something Went Wrong!");
    }
}

// Transcribe video starts (detected when btn-transcribe is clicked)
export const transcribeVideo = () => {
    // Flow: Transcribe Video --> Pass in Context to StartConversation --> Start Displaying
    var url = "";

    chrome.storage.session.get("videoLink").then(({ videoLink }) => {
        url = videoLink;
        setLoadingMessage("pending", "No Transcripts found, starting the transcribing process...");
        fetch(videoLink)
            .then((response) => response.blob()) // Fetch the video content
            .then(async (videoBlob) => {
                try {
                    const duration = await getVideoDuration(videoBlob);
                    if (duration <= 1800) {
                        setLoadingMessage("pending", "Converting video to audio format...");
                        const audioFile = await convertToAudio(videoBlob);
                        setLoadingMessage("pending", "Transcribing the audio file...");
                        const transcript = await transcribeAudio(audioFile, duration);
                        setLoadingMessage("success", "Transcribing of audio is successful!");
                        const formattedTranscript = transcript.map((t) => { return { text: t.text, timestamp: t.timestamp } });
                        await saveTranscript(videoLink, formattedTranscript);
                        setTimeout(async () => {
                            turnOffLoadingMessage();
                            isCloseNeedTranscribeSection(true);
                            sendTranscript(formattedTranscript);
                            startConversation("");
                        }, 2000);
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
    });
}

// Handle video transcript (automatically from video link if detectable) (if not click on the btn-transcribe)
export const handleTranscriptFromVideoLink = (videoTranscriptLinkElement) => {
    console.log(videoTranscriptLinkElement);
    if (!videoTranscriptLinkElement) {
        isCloseNeedTranscribeSection(false);
    } else {
        isCloseNeedTranscribeSection(true);
        videoTranscriptLinkElement = videoTranscriptLinkElement.substring(0, videoTranscriptLinkElement.indexOf("streamContent") + "streamContent".length) + "?format=json&applymediaedits=false";

        // Fetch the JSON data from the API
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
                // Save the filteredEntries to DB
                await saveTranscript(videoTranscriptLinkElement, filteredEntries);
                sendTranscript(filteredEntries);
            })
            .catch((error) => {
                console.error(`Fetch error: ${error}`);
            });
    }

    // Add a function to get the JSON to be passed in as context
    var tempContextHolder = "";
    startConversation(tempContextHolder);
}