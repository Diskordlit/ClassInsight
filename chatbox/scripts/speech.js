export const transcribeAudio = async (audioFile) => {
  try {
    const response = await fetch('http://localhost:3000/transcribe', {
      method: 'POST',
      body: audioFile,
      headers: {
        'Content-Type': 'audio/wav', // Set the appropriate content type
      },
    });

    if (response.ok) {
      const result = await response.json();
      console.log(result);
    } else {
      console.error(`Error: ${response.status} - ${response.statusText}`);
    }
  } catch (error) {
    console.error(`Unexpected error: ${error.message}`);
  }
}

// import * as sdk from "microsoft-cognitiveservices-speech-sdk";

// const config = require('./config');

// const SPEECH_KEY = config.AZURE_SPEECH_KEY;
// const SPEECH_REGION = config.AZURE_SPEECH_REGION;

// export async function fromFile(AUDIO_FILE) {

//   // Create the push stream
//   const pushStream = sdk.AudioInputStream.createPushStream();

//   // Push audio data to the stream
//   AUDIO_FILE.arrayBuffer().then((arrayBuffer) => {
//     pushStream.write(arrayBuffer.slice());
//     pushStream.close();
//   });

//   // Set up speech config and audio config
//   const speechConfig = sdk.SpeechConfig.fromSubscription(SPEECH_KEY, SPEECH_REGION);
//   const audioConfig = sdk.AudioConfig.fromStreamInput(pushStream);

//   // Create the conversation transcriber
//   const transcriber = new sdk.ConversationTranscriber(speechConfig, audioConfig);

//   // Define event handlers
//   transcriber.sessionStarted = function (s, e) {
//     console.log("(sessionStarted) SessionId:" + e.sessionId);
//   };
//   transcriber.sessionStopped = function (s, e) {
//     console.log("(sessionStopped) SessionId:" + e.sessionId);
//   };
//   transcriber.canceled = function (s, e) {
//     console.log("(canceled) " + e.errorDetails);
//   };
//   transcriber.transcribed = function (s, e) {
//     console.log("(transcribed) text: " + e.result.text);
//     console.log("(transcribed) speakerId: " + e.result.speakerId);
//   };

//   // Begin conversation transcription
//   const blobURL = createBlobURL(`
//     // Your worker code goes here
//   `);

//   const worker = new Worker(blobURL);

//   transcriber.startTranscribingAsync(
//     function () {},
//     function (err) {
//       console.trace("err - starting transcription: " + err);
//     }
//   );
// }

// function createBlobURL(script) {
//   const blob = new Blob([script], { type: 'application/javascript' });
//   return URL.createObjectURL(blob);
// }
