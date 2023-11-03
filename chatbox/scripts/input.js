import { getCurrentTime } from "./utils.js";
import { askGPT } from "./gpt.js";

const conversationContainer = document.querySelector(".conversation-container");

// Send user message to chatbox (after entered)
export const addUserPrompt = async (inputField) => {
    let userInput = document.querySelector(inputField);

    if (userInput.value.trim() !== "") {
        const userResponse = document.createElement("div");
        userResponse.className = "user-response";
        userResponse.innerHTML = userInput.value +
            '<span class="user-timestamp">' + getCurrentTime() + '</span>';
        conversationContainer.appendChild(userResponse);

        // Loading Function to be Added

        addSystemPrompt(await askGPT(userInput.value));

        // Optionally, you can clear the input field after sending the response
        userInput.value = "";

        // Scroll to the bottom to keep the latest message visible
        conversationContainer.scrollTop = conversationContainer.scrollHeight;
    }
}

// Handle system messages that are being displayed
export const addSystemPrompt = (message) => {
    const systemResponse = document.createElement("div");
    systemResponse.className = "system-response";
    systemResponse.innerHTML = message +
        '<span class="system-timestamp">' + getCurrentTime() + '</span>';
    conversationContainer.appendChild(systemResponse);

    // Scroll to the bottom to keep the latest message visible
    conversationContainer.scrollTop = conversationContainer.scrollHeight;
}