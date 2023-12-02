# ClassInsight [![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/U7U86VME5)
## Extension Installation
1. Download and unzip the latest [release](https://github.com/Diskordlit/ClassInsight/releases) of the Extension.
2. Refer to this [article](https://webkul.com/blog/how-to-install-the-unpacked-extension-in-chrome/) add the extension to Chrome or any Chromium browser (such as Microsoft Edge).

![ClassInsight Icon](https://github.com/Diskordlit/ClassInsight/blob/main/images/AI%20Classroom%20Hackathon.png)

# Project Details
ClassInsight Pro was submitted as a project for the [Microsoft AI Classroom Hackathon](https://microsoftaiclassroom.devpost.com/). <br>
It incorporated Azure AI and Database services such as Azure OpenAI, Azure Cosmos DB, and Azure Cognitive Services.

## Inspiration
The pandemic had brought about the transition of traditional lectures towards an online medium. This led to classes being recorded on platforms such as Microsoft Stream and so forth which allowed for students to look out for points they may have missed out on by simply watching the lecture recording. However, the abundance of recordings meant that students were overloaded with information. 

Oftentimes, they resort to watching the entirety of recordings that span hours just to recap on exam tips or look for specific pointers that were explained. This was an incredibly time-consuming process that presented an opportunity for improvement.

## What it does
No more passive watching – ask questions, seek clarifications, and get instant responses. Whether you missed a point, need more details, or want to review specific topics, ClassInsight Pro is your virtual study companion. As a Chrome Extension, ClassInsight Pro enables students to engage in real-time conversations with the lecture content on Microsoft Stream. Students can ask questions, seek clarifications, and receive instant responses, effectively turning a one-way lecture into an interactive dialogue. Students can enhance their learning by turning lecture videos into dynamic, interactive conversations tailored to their understanding and pace. ClassInsight Pro works regardless of whether the video has already been transcribed or does not have a transcription. It can also generate a Word document of the conversation history for future reference.

## How we built it
- Azure OpenAI
- Azure Cosmos DB
- Azure Cognitive Services
- Node.js
- Chrome Extension (HTML, CSS & JS)
- Webpack

## Challenges we ran into
Developing a Chrome Extension meant that we had to navigate the numerous constraints and limitations of the Chrome environment. One key hurdle that we had to overcome was making an API call to Azure Cognitive Service for transcribing videos that did not have a transcription. We were instead faced with a Content Security Policy issue that refused to create another service worker. This meant that we had to set up an alternate API of our own just to bypass the limitation.

## Accomplishments that we're proud of
As students ourselves, we identified struggles that we were faced with in our university lives and looked to technology to determine solutions for improvement. With the combined effort of the team, we were able to create a fully-functional Chrome Extension that leverages on the strength and capabilities offered by the Azure AI and Database services to provide value for everyday students. Not only did we learn more on developing with Azure, but are also delighted to have come up with a product that we ourselves can use as students.

## What we learned
- using Webpack to esentially 'browserify' Node.js code, allowing it to work on the client-side
- the capabilities of Chrome Extensions to provide users with an enhanced experience within the boundaries of the same webpage (just by being able to read from and edit the webpage content)

## What's next for ClassInsight Pro
- support for YouTube
- support for videos spanning longer than 30 minutes
- account-based system that saves conversation history, allowing students to pick up where they left off
- use of Embeddings in Azure OpenAI service to increase efficiency

# References:
1. https://www.youtube.com/watch?v=8OCEfOKzpAw&ab_channel=CodifyTools
2. https://rollbar.com/blog/chatgpt-api-with-javascript/
3. https://www.linkedin.com/pulse/how-use-processenv-access-environment-variables-nodejs-adnan-muzaffar/
4. https://github.com/Kagami/ffmpeg.js
5. https://phppot.com/demo/how-to-export-html-to-word-document-with-javascript/
