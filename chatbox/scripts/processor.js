import { formatTimestamp, convertToAudio } from "./utils";
import { sendTranscript } from "./gpt";

// Transcribe video starts (detected when btn-transcribe is clicked)
export const transcribeVideo = () => {
    //Flow: Transcribe Video --> Pass in Context to StartConversation --> Start Displaying

    var url = "";

    chrome.storage.session.get("videoLink").then(({ videoLink }) => {
        url = videoLink;
        console.log(videoLink);

        fetch(videoLink)
            .then((response) => response.blob()) // Fetch the video content
            .then((videoBlob) => {
                // Perform video to audio conversion using a library or service
                // For this example, assume 'convertToAudio' is a function that takes the video blob and returns audio in WAV format.
                console.log(videoBlob);
                return convertToAudio(videoBlob);
            })
            // .then((audioData) => {
            //     // Upload the converted audio to Azure Cosmos DB
            //     // Make sure you have the Cosmos DB credentials and collection details
            //     // Use the Azure Cosmos DB JavaScript SDK as shown in the previous response.
            // })
            .catch((error) => {
                console.error('Error:', error);
            });
    });

    // const status = "failed";

    // if (status === "success") {
    //     return true;
    // } else if (status === "failed") {
    //     alert("Something went wrong!");
    //     return false;
    // }
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
export const handleTranscriptJSON = async (videoTranscriptLinkElement) => {
    // Fetch the JSON data from the API
    await fetch(videoTranscriptLinkElement)
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