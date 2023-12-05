export const Decodeuint8arr = (uint8array) => {
  try {
    return JSON.parse(new TextDecoder("utf-8").decode(uint8array));
  } catch (e) {
    return new TextDecoder("utf-8").decode(uint8array);
  }
}

export const transcribeAudio = async (audioFile, audioDuration) => {
  try {
    const response = await fetch(`https://classinsightapi.azurewebsites.net/transcribe?audioDuration=${audioDuration}`, {
      method: 'POST',
      body: audioFile,
      headers: {
        'Content-Type': 'audio/wav', // Set the appropriate content type
      },
    });
    const reader = response.body.getReader();
    const transcriptResults = []; // to accumulate results
    while (true) {
      const { value, done } = await reader.read();
      if (done || Decodeuint8arr(value) === "end message") break;
      console.log("Received Transcript: ", Decodeuint8arr(value));
      transcriptResults.push(Decodeuint8arr(value));
    }
    return transcriptResults;

  } catch (error) {
    console.error(`Unexpected error: ${error.message}`);
    return null; // Or handle the error accordingly
  }
};
