import { convert } from './mp4_wav';

// Get current time
export function getCurrentTime() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    return hours + ':' + minutes;
}

// Format Timestamp
export function formatTimestamp(timestampWithMilliseconds) {
    const parts = timestampWithMilliseconds.split(".");
    return parts[0]; // Take only the part before the dot (milliseconds)
}

// Convert Video to Audio
export async function convertToAudio(videoBlob) {
    const videoFile = new File([videoBlob], "input.mp4", { type: "video/mp4" });
    //console.log(videoFile);
    let targetAudioFormat = "wav";
    console.log("================================================Converting MP4 to WAV====================================================");

    let { data } = await convert(videoFile, targetAudioFormat);
    let response = await fetch(data);
    let blobData = await response.blob();
    let blobObject = new Blob([blobData], { type: blobData.type });
    const audioFile = new File([blobObject], "output.wav", { type: "audio/wav" });
    return audioFile;

    // Download audio element (if needed)
    // let a = document.createElement("a");
    // a.href = targetAudioFile.data;
    // a.download = targetAudioFile.name + "." + targetAudioFile.format;
    // a.click();
}

// Function to get video duration from a Blob
export const getVideoDuration = async (videoBlob) => {
    return new Promise((resolve, reject) => {
        const video = document.createElement('video');
        video.preload = 'metadata';

        video.onloadedmetadata = function () {
            resolve(video.duration);
        };

        video.onerror = function () {
            reject(new Error('Failed to load video metadata.'));
        };

        video.src = URL.createObjectURL(videoBlob);
    });
};

export const setLoadingMessage = (status, message) => {
    const loading = document.getElementById("loading");
    const success = document.getElementById("success");
    const error = document.getElementById("error");
    const loadingMessage = document.getElementById("loading-message");
    const successMessage = document.getElementById("success-message");
    const errorMessage = document.getElementById("error-message");

    if (status == "pending") {
        success.style.display = "none";
        loadingMessage.textContent = message;
        loading.style.display = "flex";
    } else if (status == "success") {
        loading.style.display = "none";
        success.style.display = "flex";
        successMessage.textContent = message;

        setTimeout(() => {
            success.style.display = "none";
        }, 3000);
    } else {
        loading.style.display = "none";
        error.style.display = "flex";
        errorMessage.textContent = message;

        setTimeout(() => {
            error.style.display = "none";
        }, 3000);
    }
}

export const turnOffLoadingMessage = () => {
    const loading = document.getElementById("loading");
    const success = document.getElementById("success");
    const loadingMessage = document.getElementById("loading-message");

    loading.style.display = "none";
    success.style.display = "none";
    loadingMessage.style.display = "none";
}

// export const getDbIdFromUrl = (url) => {
//     return btoa(url).replace(/\//g, '*').replace(/\=/g, '`').slice(30, 100);
// }

export const encodeURL = (url) => {
    return encodeURIComponent(url);
}

export const generateRandomId = (length) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * chars.length);
        result += chars.charAt(randomIndex);
    }

    return result;
}

export const isCloseNeedTranscribeSection = (isClose) => {
    const needTranscribeURL = document.querySelector(".need-transcribe");
    const noNeedTranscribe = document.querySelector(".no-transcribe");

    if (!isClose) {
        needTranscribeURL.style.display = "flex";
        noNeedTranscribe.style.display = "none";
    } else {
        needTranscribeURL.style.display = "none";
    }
}

export const formatConversation = () => {
    var conversationContainer = document.getElementById("conversation-container");

    var formattedConversation = "";

    // Traverse through each child div in the conversation container
    for (let i = 0; i < conversationContainer.children.length; i++) {
        var childDiv = conversationContainer.children[i];

        // Extract role, message content, and timestamp from the child div
        var role = childDiv.getAttribute("data-role");
        var message = childDiv.textContent.trim();
        var timeSent = childDiv.getAttribute("data-timestamp");

        var messageWithoutTimestamp = message.replace(new RegExp(timeSent + "$"), "").trim();

        // Format the message with role and timestamp
        var formattedMessage = `<p style="line-height: 1.25; text-align:"><b>${role.charAt(0).toUpperCase() + role.slice(1)}</b> - ${messageWithoutTimestamp}</p>`;

        // Add the formatted message to the conversation
        formattedConversation += formattedMessage;
    }

    return formattedConversation;
}

export const showNeedTranscribeWithDelay = () => {
    const needTranscribe = document.querySelector(".need-transcribe");

    setTimeout(() => {
        needTranscribe.style.display = "flex";
    }, 3000);
}

export const addConversationLoader = () => {
    var conversationContainer = document.getElementById("conversation-container");

    // Create a loader span
    var loader = document.createElement("span");
    loader.classList.add("loader");

    // Create the system response div
    const systemResponse = document.createElement("div");
    systemResponse.className = "system-response";
    systemResponse.setAttribute("id", "system-response-loader");

    // Append the loader to the system response
    systemResponse.appendChild(loader);

    // Append the system response to the conversation container
    conversationContainer.appendChild(systemResponse);

    // Scroll to the bottom to keep the latest message visible
    conversationContainer.scrollTop = conversationContainer.scrollHeight;
}
