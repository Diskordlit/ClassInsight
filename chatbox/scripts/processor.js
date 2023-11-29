import { formatTimestamp, convertToAudio, getVideoDuration, setLoadingMessage } from "./utils";
import { sendTranscript } from "./gpt";
import { transcribeAudio } from "./speech";
import { getTranscript } from "./database";
import { startConversation } from "./popup";

const needTranscribe = document.querySelector(".need-transcribe");
const noNeedTranscribe = document.querySelector(".no-transcribe");

// Transcribe video starts (detected when btn-transcribe is clicked)
export const transcribeVideo = () => {
    // Flow: Transcribe Video --> Pass in Context to StartConversation --> Start Displaying
    const transcribeBtn = document.getElementById("transcribeBtn");
    const missingTranscribeMsg = document.getElementById("missing-transcript-msg");
    var url = "";

    chrome.storage.session.get("videoLink").then(({ videoLink }) => {
        url = videoLink;
        transcribeBtn.style.display = "none";
        missingTranscribeMsg.style.display = "none";
        setLoadingMessage("pending", "No Transcripts found, checking if transcript exists..."); //Check if Transcript exists.
        let transcript = getTranscript(url);

        if (transcript === 0) {
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
                            transcript = await transcribeAudio(audioFile, duration);
                            setLoadingMessage("success", "Starting Conversation...");
                            sendTranscript(transcript); //remove loading and everything show Conversation.
                            //Need to Add save transcribe to DB function here <-- Ryan
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
            sendTranscript(transcript); //remove loading and everything show Conversation.
            startConversation("success");
        }
    });

}

// Handle video transcript
export const handleVideoTranscript = (videoTranscriptLinkElement) => {

    console.log(videoTranscriptLinkElement);
    if (!videoTranscriptLinkElement) {
        needTranscribe.style.display = "block";
        noNeedTranscribe.style.display = "none";
    } else {
        needTranscribe.style.display = "none";
        noNeedTranscribe.style.display = "none";
        setLoadingMessage("pending", "Fetching existing transcript for context...");
        setTimeout(() => {
            videoTranscriptLinkElement = videoTranscriptLinkElement.substring(0, videoTranscriptLinkElement.indexOf("streamContent") + "streamContent".length) + "?format=json&applymediaedits=false";
            handleTranscriptJSON(videoTranscriptLinkElement);
            setLoadingMessage("success", "Starting Conversation...");
            setTimeout(() => {
                startConversation("success");
            }, 3000);
        }, 3000);
    }

    // // Add a function to get the JSON to be passed in as context
    // var tempContextHolder = "";
    // callbackFn(tempContextHolder);
}

// Handle JSON transcript
export const handleTranscriptJSON = (videoTranscriptLinkElement) => {

    // Fetch the JSON data from the API
    fetch(videoTranscriptLinkElement)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.status}`);
            }
            return response.json(); // Parse the response as JSON
        })
        .then((jsonData) => {
            // Once you have the JSON data, you can process it as shown in the previous example
            const filteredEntries = [];

            for (const entry of jsonData.entries) {
                const { text, startOffset } = entry;
                const formattedTimestamp = formatTimestamp(startOffset);
                const filteredEntry = { text, timestamp: formattedTimestamp };
                filteredEntries.push(filteredEntry);
            }

            // Now, you can work with the filteredEntries array
            sendTranscript(filteredEntries);
        })
        .catch((error) => {
            console.error(`Fetch error: ${error}`);
        });
}

export const shareConversation = () => {

}