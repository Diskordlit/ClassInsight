import { formatTimestamp, convertToAudio, getVideoDuration, setLoadingMessage } from "./utils";
import { sendTranscript } from "./gpt";
import { transcribeAudio } from "./speech";

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
                        const transcript = await transcribeAudio(audioFile);
                        setLoadingMessage("success", "Transcribing of audio is successful!");
                        console.log(transcript);
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

// Handle video transcript
export const handleVideoTranscript = (videoTranscriptLinkElement, callbackFn) => {
    const needTranscribeURL = document.querySelector(".need-transcribe");
    const noTranscribe = document.querySelector(".no-transcribe");

    console.log(videoTranscriptLinkElement);
    if (!videoTranscriptLinkElement) {
        needTranscribeURL.style.display = "block"; // Change back to "block" later
        noTranscribe.style.display = "none";
    } else {
        needTranscribeURL.style.display = "block"; // Change back to "block" later
        videoTranscriptLinkElement = videoTranscriptLinkElement.substring(0, videoTranscriptLinkElement.indexOf("streamContent") + "streamContent".length) + "?format=json&applymediaedits=false";
        handleTranscriptJSON(videoTranscriptLinkElement);
        needTranscribeURL.style.display = "none";
    }

    // Add a function to get the JSON to be passed in as context
    var tempContextHolder = "";
    callbackFn(tempContextHolder);
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
            console.log(filteredEntries);
            sendTranscript(filteredEntries);
        })
        .catch((error) => {
            console.error(`Fetch error: ${error}`);
        });
}