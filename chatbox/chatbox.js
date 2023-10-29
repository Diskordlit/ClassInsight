window.onload = function () {
    const videoTranscriptLinkElement = document.querySelector("video > track");
    const needTranscribeURL = document.querySelector(".need-transcribe");

    if (videoTranscriptLinkElement === null || videoTranscriptLinkElement.src === null) {
        needTranscribeURL.style.display = "none"; //Change Back to block later
    } else {
        videoTranscriptLinkElement = videoTranscriptLinkElement.src;
        videoTranscriptLinkElement = videoTranscriptLinkElement.substring(0, originalLink.indexOf("streamContent") + "streamContent".length) + "&format=json&applymediaedits=false";
        needTranscribeURL.style.display = "none";
    }
}

function transcribeVideo() {
    alert("Add Transcribe Video Function!");

    const status = "failed";

    if (status === "success") {
        startConversation();
    } else if (status === "failed") {
        alert("Something went wrong!")
    }
}

function startConversation() {
    alert("Add Start Conversation Function!");
}

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