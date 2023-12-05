export const Decodeuint8arr = (uint8array) => {
  return JSON.parse(new TextDecoder("utf-8").decode(uint8array));
}

export const transcribeAudio = async (audioFile, audioDuration) => {
  try {
    const response = await fetch(`http://localhost:6969/transcribe?audioDuration=${audioDuration}`, {
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
      if (done) break;
      console.log("Received Transcript: ", Decodeuint8arr(value));
      transcriptResults.push(Decodeuint8arr(value));
    }
    return transcriptResults;

    // if (response.ok) {
    //   const result = await response.json();
    //   console.log(result); // Optional: log the result for debugging
    //   return result; // Return the result
    // } else {
    //   console.error(`Error: ${response.status} - ${response.statusText}`);
    //   return null; // Or handle the error accordingly
    // }
  } catch (error) {
    console.error(`Unexpected error: ${error.message}`);
    return null; // Or handle the error accordingly
  }
};
