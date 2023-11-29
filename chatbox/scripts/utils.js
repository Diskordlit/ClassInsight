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
    console.log(videoFile);
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
    const loadingMessage = document.getElementById("loading-message");
    const successMessage = document.getElementById("success-message");

    if (status == "pending") {
        success.style.display = "none";
        loadingMessage.textContent = message;
        loading.style.display = "block";
    } else {
        loading.style.display = "none";
        success.style.display = "block";
        successMessage.textContent = message;

        setTimeout(() => {
            success.style.display = "none";
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

export const getDbIdFromUrl = (url) => {
    return btoa(url).replace(/\//g, '*').replace(/\=/g, '`').slice(30, 80);
}

export const isCloseNeedTranscribeSection = (isClose) => {
    const needTranscribeURL = document.querySelector(".need-transcribe");
    const noNeedTranscribe = document.querySelector(".no-transcribe");

    if (!isClose) {
        needTranscribeURL.style.display = "block"; // Change back to "block" later
        noNeedTranscribe.style.display = "none";
    } else {
        needTranscribeURL.style.display = "none";
    }
}