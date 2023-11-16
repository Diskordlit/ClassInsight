const fs = require("fs");
const sdk = require("microsoft-cognitiveservices-speech-sdk");

const config = require('./config');
const endpoint = config.AZURE_SPEECH_ENDPOINT;
const azureApiKey = config.AZURE_SPEECH_KEY;
const region = config.AZURE_SPEECH_REGION;

// This example requires environment variables named "SPEECH_KEY" and "SPEECH_REGION"
const speechConfig = sdk.SpeechConfig.fromSubscription(azureApiKey, region);
speechConfig.speechRecognitionLanguage = "en-US";

// Requests word-level timestamps for the recognized speech.
speechConfig.requestWordLevelTimestamps();

// Sets the output format to Detailed.
speechConfig.outputFormat = sdk.OutputFormat.Detailed;

export const fromFile = async (audioFile) => {
    let audioConfig = sdk.AudioConfig.fromWavFileInput(fs.readFileSync(audioFile));
    let speechRecognizer = new sdk.SpeechRecognizer(speechConfig, audioConfig);
    speechRecognizer.recognizeOnceAsync(result => {
        switch (result.reason) {
            case sdk.ResultReason.RecognizedSpeech:
                return `RECOGNIZED: Text=${result.text}`;
            case sdk.ResultReason.NoMatch:
                return "NOMATCH: Speech could not be recognized.";
            case sdk.ResultReason.Canceled:
                const cancellation = sdk.CancellationDetails.fromResult(result);
                var reason = `CANCELED: Reason=${cancellation.reason}`;

                if (cancellation.reason == sdk.CancellationReason.Error) {
                    return `
                    CANCELED: Reason=${cancellation.reason}
                    CANCELED: ErrorCode=${cancellation.ErrorCode}
                    CANCELED: ErrorDetails=${cancellation.errorDetails}
                    CANCELED: Did you set the speech resource key and region values?"
                    `;
                } else {
                    return reason;
                }
        }
        speechRecognizer.close();
        console.log("it works somehow.");
    });
}