// Import Necessary style and fontawesome CSS files.
var popupStyle = document.createElement("link");
popupStyle.rel = "stylesheet";
popupStyle.type = "text/css";
popupStyle.href = chrome.runtime.getURL("chatbox/styles/popup.css"); // Provide the path to your style.css file

var fontawesomeOne = document.createElement("link");
fontawesomeOne.rel = "stylesheet";
fontawesomeOne.type = "text/css";
fontawesomeOne.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css";
fontawesomeOne.integrity = "sha512-5A8nwdMOWrSz20fDsjczgUidUBR8liPYU+WymTZP1lmY9G6Oc7HlZv156XqnsgNUzTyMefFTcsFH/tnJE/+xBg==";
fontawesomeOne.crossOrigin = "anonymous";
fontawesomeOne.referrerPolicy = "no-referrer";

var fontawesomeTwo = document.createElement("link");
fontawesomeTwo.rel = "stylesheet";
fontawesomeTwo.type = "text/css";
fontawesomeTwo.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css";
fontawesomeTwo.integrity = "sha512-SfTiTlX6kk+qitfevl/7LibUOeJWlt9rbyDn92a1DqWOw9vWG2MFoays0sgObmWazO5BQPiFucnnEAjpAB+/Sw==";
fontawesomeTwo.crossOrigin = "anonymous";
fontawesomeTwo.referrerPolicy = "no-referrer";

// Append the link element to the head of the document
document.head.appendChild(popupStyle);
document.head.appendChild(fontawesomeOne);
document.head.appendChild(fontawesomeTwo);

// Open Modal Button
var openModalButton = document.createElement("button");
openModalButton.classList.add("openModalButton");

//Open Modal Logo
var openLogo = document.createElement("img");
openLogo.classList.add("openIcon");
openLogo.src = chrome.runtime.getURL("chatbox/styles/logo.png");
openLogo.alt = "open";

openModalButton.appendChild(openLogo);
document.body.appendChild(openModalButton);

// setTimeout function
setTimeout(() => {
    openModalButton.style.display = "block";

    // Iframe
    var extensionContainer = document.createElement("iframe");
    extensionContainer.classList.add("extension-container");
    extensionContainer.src = chrome.runtime.getURL("chatbox/views/popup.html");

    // Modal Container
    var modalContainer = document.createElement("div");
    modalContainer.classList.add("modalContainer");

    // Close Button Icon
    var closeIcon = document.createElement("i");
    closeIcon.classList.add("fa");
    closeIcon.classList.add("fa-times");
    closeIcon.classList.add("closeIcon");

    // Close Button
    var closeModalButton = document.createElement("button");
    closeModalButton.classList.add("closeModalButton");
    closeModalButton.addEventListener("click", function () {
        modalContainer.style.display = "none";
        openModalButton.style.display = "block";
    });

    closeModalButton.appendChild(closeIcon);

    // Add Iframe & Close Button to Modal
    modalContainer.appendChild(extensionContainer);
    modalContainer.appendChild(closeModalButton);

    // Create a function to open the modal
    function openModal() {
        modalContainer.style.display = "block";
        openModalButton.style.display = "none";
    }

    // Attach a click event to the button
    openModalButton.addEventListener("click", function () {
        openModal();
    });

    // Append the modal container to the body
    document.body.appendChild(modalContainer);

}, 5000);
