import { addUserPrompt, addSystemPrompt } from "./input.js";
import { fetchVideoTranscriptLink, isVideoTranscriptLink } from "./data.js";
import { handleVideoTranscript, transcribeVideo } from "./processor.js";

// to enable it in all content scripts 
chrome.storage.session.setAccessLevel({ accessLevel: 'TRUSTED_AND_UNTRUSTED_CONTEXTS' });

function startConversation() {
    const noTranscribe = document.querySelector(".chatbox-container");
    const status = "success";

    if (status === "success") {
        noTranscribe.style.display = "block";
        addSystemPrompt("Hello there! What would you like to know about the video?", ".conversation-container");
    } else {
        alert("Something Went Wrong!");
    }

    alert("Add Start Conversation Function!");
}

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
                        handleVideoTranscript(videoTranscriptLink, startConversation);
                    } else {
                        // If 'videoTranscriptLink' does not exist, perform other tasks
                        fetchVideoTranscriptLink();
                        handleVideoTranscript(videoTranscriptLink, startConversation);
                    }
                } else {
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
        const result = transcribeVideo();
        if (result) {
            startConversation("");
        }
    });

    sendBtn.addEventListener('click', () => {
        addUserPrompt("#userInput", ".conversation-container");
    });

    resetBtn.addEventListener('click', () => {
        startUp();
    })
});
