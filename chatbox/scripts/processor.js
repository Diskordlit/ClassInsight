// Transcribe video starts (detected when btn-transcribe is clicked)
export const transcribeVideo = () => {
    //Flow: Transcribe Video --> Pass in Context to StartConversation --> Start Displaying

    alert("Add Transcribe Video Function!");

    const status = "failed";

    if (status === "success") {
        return true;
    } else if (status === "failed") {
        alert("Something went wrong!");
        return false;
    }
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
                const { text, startOffset, endOffset } = entry;
                const filteredEntry = { text, startOffset, endOffset };
                filteredEntries.push(filteredEntry);
            }

            // Now, you can work with the filteredEntries array
            console.log(filteredEntries);
        })
        .catch((error) => {
            console.error(`Fetch error: ${error}`);
        });
}