async function startServer() {
  const express = require('express');
  const bodyParser = require('body-parser');
  const config = require('./config.js');
  const { SpeechConfig, AudioConfig, AudioInputStream, ConversationTranscriber } = await import('microsoft-cognitiveservices-speech-sdk');
  const cors = require('cors');

  const app = express();
  const port = process.env.PORT || 6969;

  const transcriptResults = [];
  var status = "pending";

  app.use(cors());
  app.use(bodyParser.raw({ type: 'audio/wav', limit: '100mb' }));

  app.get('/', (req, res) => res.json(({ message: 'Hello ClassInsight' })));

  app.post('/transcribe', async (req, res) => {
    try {
      status = "pending";

      const audioBuffer = req.body;
      const audioDuration = req.query.audioDuration;

      // Create the push stream
      const pushStream = AudioInputStream.createPushStream();

      // Push audio data to the stream
      pushStream.write(audioBuffer);
      pushStream.close();

      // Acknowledge receipt of the audio file
      res.status(200).json({ message: 'Audio file received. Transcription process started.' });

      // Set up speech config and audio config
      const speechConfig = SpeechConfig.fromSubscription(config.AZURE_SPEECH_KEY, config.AZURE_SPEECH_REGION);
      const audioConfig = AudioConfig.fromStreamInput(pushStream);

      // Create the conversation transcriber
      const transcriber = new ConversationTranscriber(speechConfig, audioConfig);

      // Define event handlers
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

      // Start conversation transcription
      await new Promise((resolve, reject) => {
        transcriber.startTranscribingAsync(
          () => {
            // Transcription started successfully
            console.log("Transcription started");
            resolve();
          },
          (err) => {
            console.trace(`err - starting transcription: ${err}`);
            reject(err);
          }
        );
      });

      // Wait for the specified duration
      await new Promise(resolve => setTimeout(resolve, audioDuration * 1000));

      // Stop transcription
      transcriber.stopTranscribingAsync();

      status = "completed";

    } catch (error) {
      console.error(`Unexpected error: ${error.message}`);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  app.get('/getTranscriptResults', (req, res) => {
    try {
      // Respond with the stored transcript results
      res.status(200).json({status, transcriptResults});
    } catch (error) {
      console.error(`Unexpected error: ${error.message}`);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
  });
}

startServer();