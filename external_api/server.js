import * as sdk from 'microsoft-cognitiveservices-speech-sdk';
import { default as cors } from 'cors';
import express from 'express';
import bodyParser from 'body-parser';
import config from './config.js';

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.raw({ type: 'audio/wav', limit: '50mb' }));

app.post('/transcribe', async (req, res) => {
  try {
    const audioBuffer = req.body;

    // Create the push stream
    const pushStream = sdk.AudioInputStream.createPushStream();

    // Push audio data to the stream
    pushStream.write(audioBuffer);
    pushStream.close();

    // Set up speech config and audio config
    const speechConfig = sdk.SpeechConfig.fromSubscription(config.AZURE_SPEECH_KEY, config.AZURE_SPEECH_REGION);
    const audioConfig = sdk.AudioConfig.fromStreamInput(pushStream);

    // Create the conversation transcriber
    const transcriber = new sdk.ConversationTranscriber(speechConfig, audioConfig);

    // Define event handlers
    transcriber.sessionStarted = (s, e) => {
      console.log(`(sessionStarted) SessionId: ${e.sessionId}`);
    };
    transcriber.sessionStopped = (s, e) => {
      console.log(`(sessionStopped) SessionId: ${e.sessionId}`);
    };
    transcriber.canceled = (s, e) => {
      console.log(`(canceled) ${e.errorDetails}`);
      res.status(500).json({ error: 'Transcription error' });
    };
    transcriber.transcribed = (s, e) => {
      console.log(`(transcribed) text: ${e.result.text}`);
      console.log(`(transcribed) speakerId: ${e.result.speakerId}`);
      res.json({ text: e.result.text, speakerId: e.result.speakerId });
    };

    // Begin conversation transcription
    await transcriber.startTranscribingAsync(
      () => {},
      (err) => {
        console.trace(`err - starting transcription: ${err}`);
        res.status(500).json({ error: 'Transcription error' });
      }
    );
  } catch (error) {
    console.error(`Unexpected error: ${error.message}`);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
