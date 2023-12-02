import * as sdk from 'microsoft-cognitiveservices-speech-sdk';
import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser';
import config from '../chatbox/scripts/config.js';

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.raw({ type: 'audio/wav', limit: '50mb' }));

app.get('/', (req, res) => res.json(({message: 'Hello ClassInsight'})));

app.post('/transcribe', (req, res) => {
  try {
    const audioBuffer = req.body;
    const audioDuration = req.query.audioDuration;

    // Create the push stream
    const pushStream = sdk.AudioInputStream.createPushStream();

    // Push audio data to the stream
    pushStream.write(audioBuffer);
    pushStream.close();

    // Set up speech config and audio config
    const speechConfig = sdk.SpeechConfig.fromSubscription(config.AZURE_SPEECH_KEY, config.AZURE_SPEECH_REGION);
    //speechConfig.requestWordLevelTimestamps();
    const audioConfig = sdk.AudioConfig.fromStreamInput(pushStream);

    // Create the conversation transcriber
    const transcriber = new sdk.ConversationTranscriber(speechConfig, audioConfig);

    // Define event handlers
    const transcriptResults = []; // to accumulate results
    transcriber.transcribed = (s, e) => {
      let sentenceTimestamps = {};

      // Process sentence-level timestamps
      if (e.result.privJson) {
        const jsonResult = JSON.parse(e.result.privJson);
        const startTime = jsonResult.Offset / 10000; // Convert offset from 100-nanosecond units to milliseconds
        const endTime = (jsonResult.Offset + jsonResult.Duration) / 10000; // Convert duration to milliseconds

        // Convert endTime to minutes and seconds format
        const minutes = Math.floor(startTime / 60000);
        const seconds = ((startTime % 60000) / 1000).toFixed(0);

        sentenceTimestamps = {
          startTime: startTime,
          endTime: endTime,
          formattedStartTime: `${minutes}:${(seconds < 10 ? '0' : '')}${seconds}`,
        };
      }

      transcriptResults.push({
        text: e.result.text,
        speakerId: e.result.speakerId,
        timestamp: sentenceTimestamps.formattedStartTime
      });

      console.log(transcriptResults);
    };

    // Begin conversation transcription
    transcriber.startTranscribingAsync(
      () => {
        // Transcription started successfully
        console.log("Transcription started");
      },
      (err) => {
        console.trace(`err - starting transcription: ${err}`);
        res.status(500).json({ error: 'Transcription error' });
      }
    );

    // Handle completion using a timeout (adjust as needed)
    setTimeout(() => {
      // Stop transcription after a certain period
      transcriber.stopTranscribingAsync();

      // Send accumulated results
      res.json(transcriptResults);
    }, audioDuration * 1000); // 30 seconds as an example, adjust as needed
  } catch (error) {
    console.error(`Unexpected error: ${error.message}`);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
