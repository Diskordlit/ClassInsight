// Note: No need to import 'browserify-https' and 'browserify-fs' in a browser environment

const config = require('./config');

const SPEECH_KEY = config.AZURE_SPEECH_KEY;
const SPEECH_REGION = config.AZURE_SPEECH_REGION;
const SPEECH_ENDPOINT = config.AZURE_SPEECH_ENDPOINT;

export async function fromFile(AUDIO_FILE, AUDIO_LINK) {
  let formData;

  console.log(AUDIO_FILE);
  console.log(AUDIO_LINK);

  // if (AUDIO_FILE instanceof File) {
  //   // If AUDIO_FILE is a File object
  //   formData = new FormData();
  //   formData.append('file', AUDIO_FILE);
  // } else if (typeof AUDIO_FILE === 'object' && AUDIO_FILE !== null) {
  //   // If AUDIO_FILE is an object
  //   // You need to handle the object appropriately, based on your use case
  //   // For example, if AUDIO_FILE is an object with a property 'data', you could do:
  //   formData = new FormData();
  //   formData.append('file', AUDIO_FILE.data);
  // } else {
  //   console.error('Unsupported audio file type');
  //   return;
  // }

  const options = {
    method: 'POST',
    headers: {
      'Ocp-Apim-Subscription-Key': SPEECH_KEY,
      'Content-Type': "application/json"
    },
    // body: formData,
    body: JSON.stringify({
      "contentUrls": [
        AUDIO_LINK
      ],
      "properties": {
        "diarizationEnabled": false,
        "wordLevelTimestampsEnabled": false,
        "punctuationMode": "DictatedAndAutomatic",
        "profanityFilterMode": "Masked"
      },
      "locale": "en-US",
      "displayName": "Transcription using default model for en-US"
    })
  };

  try {
    const response = await fetch(`${SPEECH_ENDPOINT}`, options);
    console.log(`statusCode: ${response.status}`);
    const result = response;
    console.log(result);
  } catch (error) {
    console.error(error);
  }
}
