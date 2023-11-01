import { getCurrentTime } from "./utils.js";

// Send user message to chatbox (after entered)
export const addUserPrompt = (inputField, conversationField) => {
    const userInput = document.querySelector(inputField).value;
    if (userInput.trim() !== "") {
        const conversationContainer = document.querySelector(conversationField);
        const userResponse = document.createElement("div");
        userResponse.className = "user-response";
        userResponse.innerHTML = userInput +
            '<span class="user-timestamp">' + getCurrentTime() + '</span>';
        conversationContainer.appendChild(userResponse);

        // Optionally, you can clear the input field after sending the response
        userInput.value = "";

        // Scroll to the bottom to keep the latest message visible
        conversationContainer.scrollTop = conversationContainer.scrollHeight;
    }
}

// Handle system messages that are being displayed
export const addSystemPrompt = (message, conversationField) => {
    const conversationContainer = document.querySelector(conversationField);
    const systemResponse = document.createElement("div");
    systemResponse.className = "system-response";
    systemResponse.innerHTML = message +
        '<span class="system-timestamp">' + getCurrentTime() + '</span>';
    conversationContainer.appendChild(systemResponse);

    // Scroll to the bottom to keep the latest message visible
    conversationContainer.scrollTop = conversationContainer.scrollHeight;
}