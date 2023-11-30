var iFrame = document.createElement("iframe");
iFrame.style.position = "absolute";
iFrame.style.zIndex = "1";
iFrame.style.top = "10px";
iFrame.style.right = "10px";
iFrame.style.width = "max-content";
iFrame.style.minHeight = "27vh";
iFrame.style.height = "auto";
iFrame.src = chrome.runtime.getURL("chatbox/views/popup.html");

setTimeout(() => {
    const parent = document.querySelector(".sp-Stream-root");
    parent.insertBefore(iFrame, parent.firstChild);
}, 5000);