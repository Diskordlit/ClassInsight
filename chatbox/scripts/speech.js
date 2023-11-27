export const transcribeAudio = async (audioFile, audioDuration) => {
  try {
    const response = await fetch(`http://localhost:3000/transcribe?audioDuration=${audioDuration}`, {
      method: 'POST',
      body: audioFile,
      headers: {
        'Content-Type': 'audio/wav', // Set the appropriate content type
      },
    });

    if (response.ok) {
      const result = await response.json();
      console.log(result); // Optional: log the result for debugging
      return result; // Return the result
    } else {
      console.error(`Error: ${response.status} - ${response.statusText}`);
      return null; // Or handle the error accordingly
    }
  } catch (error) {
    console.error(`Unexpected error: ${error.message}`);
    return null; // Or handle the error accordingly
  }
};
