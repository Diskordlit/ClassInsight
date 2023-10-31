async function fetchData() {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    // skip urls like "chrome://" to avoid extension error
    if (tab.url?.startsWith("chrome://")) return undefined;

    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: getVideoTranscriptLink,
    });
}

var videoTranscriptLink = "";

function getVideoTranscriptLink() {
    videoTranscriptLink = document.querySelector("video > track").src;
    console.log(videoTranscriptLink);
    chrome.storage.sync.set({ videoTranscriptLink });
}

function handleVideoTranscript(videoTranscriptLinkElement) {
    const needTranscribeURL = document.querySelector(".need-transcribe");

    if (!videoTranscriptLinkElement) {
        needTranscribeURL.style.display = "block"; // Change back to "block" later
    } else {
        if (!videoTranscriptLinkElement.src) {
            needTranscribeURL.style.display = "block"; // Change back to "block" later
            return;
        }
        videoTranscriptLinkElement = videoTranscriptLinkElement.substring(0, videoTranscriptLinkElement.indexOf("streamContent") + "streamContent".length) + "?format=json&applymediaedits=false";
        handleTranscriptJSON(videoTranscriptLinkElement);
        needTranscribeURL.style.display = "none";

        // Add a function to get the JSON to be passed in as context
        var tempContextHolder = "";
        startConversation(tempContextHolder);
    }
}

function handleTranscriptJSON(videoTranscriptLinkElement) {

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

document.addEventListener('DOMContentLoaded', function () {
    fetchData();

    chrome.storage.sync.get("videoTranscriptLink", ({ videoTranscriptLink }) => {
        handleVideoTranscript(videoTranscriptLink);
    });

    transcribeBtn.addEventListener('click', () => {
        transcribeVideo()
    });

    sendBtn.addEventListener('click', () => {
        addUserPrompt();
    })
});

// Transcribe video starts (detected when btn-transcribe is clicked)
function transcribeVideo() {
    //Flow: Transcribe Video --> Pass in Context to StartConversation --> Start Displaying

    alert("Add Transcribe Video Function!");

    var tempContextHolder = "";
    const status = "failed";

    if (status === "success") {
        startConversation(tempContextHolder);
    } else if (status === "failed") {
        alert("Something went wrong!")
    }
}

// Send user message to chatbox (after entered)
function addUserPrompt() {
    const userInput = document.getElementById("userInput").value;
    if (userInput.trim() !== "") {
        const conversationContainer = document.querySelector(".conversation-container");
        const userResponse = document.createElement("div");
        userResponse.className = "user-response";
        userResponse.innerHTML = userInput +
            '<span class="user-timestamp">' + getCurrentTime() + '</span>';
        conversationContainer.appendChild(userResponse);

        // Optionally, you can clear the input field after sending the response
        document.getElementById("userInput").value = "";

        // Scroll to the bottom to keep the latest message visible
        conversationContainer.scrollTop = conversationContainer.scrollHeight;
    }
}

function startConversation(context) {
    const noTranscribe = document.querySelector(".chatbox-container");
    const status = "success";

    if (status === "success") {
        noTranscribe.style.display = "block";
        addSystemPrompt("Hello there! What would you like to know about the video?");
    } else {
        alert("Something Went Wrong!");
    }

    alert("Add Start Conversation Function!");
}

function addSystemPrompt(message) {
    const conversationContainer = document.querySelector(".conversation-container");
    const systemResponse = document.createElement("div");
    systemResponse.className = "system-response";
    systemResponse.innerHTML = message +
        '<span class="system-timestamp">' + getCurrentTime() + '</span>';
    conversationContainer.appendChild(systemResponse);

    // Scroll to the bottom to keep the latest message visible
    conversationContainer.scrollTop = conversationContainer.scrollHeight;
}

function getCurrentTime() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    return hours + ':' + minutes;
}