import { convert } from 'video-to-audio';

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