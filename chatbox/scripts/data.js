// Fetch the video transcript link
export const fetchVideoTranscriptLink = async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    // skip urls like "chrome://" to avoid extension error
    if (tab.url?.startsWith("chrome://")) return undefined;

    await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: getVideoTranscriptLink,
    });
}

// Set video transcript link onto chrome session
export const getVideoTranscriptLink = () => {
    let videoTranscriptLink = document.querySelector("video > track").src;
    chrome.storage.session.set({ videoTranscriptLink, videoUrl: window.location.href});
}

// Check whether video exists
export const isVideoTranscriptLink = () => {
    return document.querySelector("video > track") != null;
}