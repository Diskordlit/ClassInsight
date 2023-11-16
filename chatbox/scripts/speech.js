const fs = require("fs");
const sdk = require("microsoft-cognitiveservices-speech-sdk");
const config = require('./config');

const endpoint = config.AZURE_SPEECH_ENDPOINT;
const azureApiKey = config.AZURE_SPEECH_KEY;
const region = config.AZURE_SPEECH_REGION;

const speechConfig = sdk.SpeechConfig.fromSubscription(azureApiKey, region);
speechConfig.speechRecognitionLanguage = "en-US";
speechConfig.requestWordLevelTimestamps();
speechConfig.outputFormat = sdk.OutputFormat.Detailed;

export const fromFile = async (audioFile) => {
  return new Promise((resolve, reject) => {
    try {
      const audioConfig = sdk.AudioConfig.fromWavFileInput(audioFile);
      const speechRecognizer = new sdk.SpeechRecognizer(speechConfig, audioConfig);

      speechRecognizer.recognizeOnceAsync(result => {
        switch (result.reason) {
          case sdk.ResultReason.RecognizedSpeech:
            const recognizedText = `RECOGNIZED: Text=${result.text}`;
            resolve(recognizedText);
            console.log(recognizedText); // Add console.log here
            break;
          case sdk.ResultReason.NoMatch:
            resolve("NOMATCH: Speech could not be recognized.");
            break;
          case sdk.ResultReason.Canceled:
            const cancellation = sdk.CancellationDetails.fromResult(result);
            const reason = `CANCELED: Reason=${cancellation.reason}`;

            if (cancellation.reason === sdk.CancellationReason.Error) {
              reject(`
                CANCELED: Reason=${cancellation.reason}
                CANCELED: ErrorCode=${cancellation.ErrorCode}
                CANCELED: ErrorDetails=${cancellation.errorDetails}
                CANCELED: Did you set the speech resource key and region values?"
              `);
            } else {
              resolve(reason);
            }
            break;
        }

        // Close the speech recognizer
        speechRecognizer.close();
      });
    } catch (error) {
      reject(error);
    }
  });
};
