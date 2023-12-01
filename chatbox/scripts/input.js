import { getCurrentTime } from "./utils";
import { askGPT } from "./gpt";

const conversationContainer = document.querySelector(".conversation-container");

// Send user message to chatbox (after entered)
export const addUserPrompt = async (inputField) => {
    let userInput = document.querySelector(inputField);
    let time = getCurrentTime();

    if (userInput.value.trim() !== "") {
        const userResponse = document.createElement("div");
        userResponse.className = "user-response";
        userResponse.innerHTML = userInput.value +
            '<span class="user-timestamp">' + time + '</span>';
        userResponse.setAttribute("data-role", "system");
        userResponse.setAttribute("data-timestamp", time);
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

    let time = getCurrentTime();

    //Add Additional Attributes
    systemResponse.setAttribute("data-role", "system");
    systemResponse.setAttribute("data-timestamp", time);

    // Check if the message contains points (e.g., '1.', '2.')
    const hasPoints = /\d+\./.test(message);

    if (hasPoints) {
        // Split the text into points using the specified delimiter (e.g., '1.')
        const points = message.split(/\d+\./).filter(Boolean);

        // Create an unordered list element
        const ul = document.createElement('ul');

        // Add each point as a list item
        points.forEach(point => {
            const li = document.createElement('li');
            li.textContent = point.trim();
            ul.appendChild(li);
        });

        // Append the list to the system response
        systemResponse.appendChild(ul);
    } else {
        // If there are no points, just add the message as a plain text
        systemResponse.textContent = message;
    }

    // Add timestamp to the system response
    systemResponse.innerHTML += '<span class="system-timestamp">' + time + '</span>';

    // Append the system response to the conversation container
    conversationContainer.appendChild(systemResponse);

    // Scroll to the bottom to keep the latest message visible
    conversationContainer.scrollTop = conversationContainer.scrollHeight;
}