window.onload = function () {
    const videoTranscriptLinkElement = document.querySelector("video > track");
    const needTranscribeURL = document.querySelector(".need-transcribe");

    if (videoTranscriptLinkElement === null || videoTranscriptLinkElement.src === null) {
        needTranscribeURL.style.display = "block"; //Change Back to block later
    } else {
        videoTranscriptLinkElement = videoTranscriptLinkElement.src;
        videoTranscriptLinkElement = videoTranscriptLinkElement.substring(0, originalLink.indexOf("streamContent") + "streamContent".length) + "&format=json&applymediaedits=false";
        needTranscribeURL.style.display = "none";

        //Add in function to get the json to be passed in as context
        var tempContextHolder = "";
        startConversation(tempContextHolder);
    }
}

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

function startConversation(context) {
    const noTranscribe = document.querySelector(".chatbox-container");
    const status = "failed";

    if (status === "success") {
        noTranscribe.style.display = "block";
        addSystemPrompt("Hello there! What would you like to know about the video?");
    } else {
        alert("Something Went Wrong!");
    }

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