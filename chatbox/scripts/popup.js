import { addUserPrompt } from "./input.js";
import { fetchVideoTranscriptLink, isVideoTranscriptLink, fetchStreamVideoLink } from "./data.js";
import { handleTranscriptFromVideoLink, transcribeVideo } from "./processor.js";

// to enable it in all content scripts 
chrome.storage.session.setAccessLevel({ accessLevel: 'TRUSTED_AND_UNTRUSTED_CONTEXTS' });

async function startUp() {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    // skip urls like "chrome://" to avoid extension error
    if (tab.url?.startsWith("chrome://")) return undefined;

    let isValid;
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: isVideoTranscriptLink,
    }).then((res) => isValid = res[0].result)
        .then((_) => {
            chrome.storage.session.get(["videoTranscriptLink", "videoUrl"]).then(({ videoTranscriptLink, videoUrl }) => {
                if (isValid) {
                    if (videoTranscriptLink && videoUrl == tab.url) {
                        // If 'videoTranscriptLink' exists in storage, handle it
                        handleTranscriptFromVideoLink(videoTranscriptLink);
                    } else {
                        // If 'videoTranscriptLink' does not exist, perform other tasks
                        fetchVideoTranscriptLink();
                        startUp();
                    }
                } else {
                    fetchStreamVideoLink();
                    // Clear the 'videoTranscriptLink' in storage
                    chrome.storage.session.remove(["videoTranscriptLink", "videoUrl"], function () {
                        if (chrome.runtime.lastError) {
                            console.error(chrome.runtime.lastError);
                        } else {
                            console.log('videoTranscriptLink & videoUrl removed from storage');
                        }
                    });
                }
            }).catch((err) => {
                console.log(err);
            });
        })
}

document.addEventListener('DOMContentLoaded', function () {
    startUp();

    transcribeBtn.addEventListener('click', () => {
        transcribeVideo();
        // const result = transcribeVideo();
        // if (result) {
        //     startConversation("");
        // }
    });

    sendBtn.addEventListener('click', () => {
        addUserPrompt("#userInput");
    });

    resetBtn.addEventListener('click', () => {
        //startUp();
    })
});
