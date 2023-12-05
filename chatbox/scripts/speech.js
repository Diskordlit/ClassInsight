export const transcribeAudio = async (audioFile, audioDuration) => {
  try {
    const audioUploadresponse = await fetch(`https://classinsightapi.azurewebsites.net/transcribe?audioDuration=${audioDuration}`, {
      method: 'POST',
      body: audioFile,
      headers: {
        'Content-Type': 'audio/wav', // Set the appropriate content type
      },
    });

    if (audioUploadresponse.ok) {
      //console.log("Audio File Received.");
      return "Audio File Received";
    } else {
      console.error(`Error: ${audioUploadresponse.status} - ${audioUploadresponse.statusText}`);
      return null; // Or handle the error accordingly
    }

  } catch (error) {
    console.error(`Unexpected error: ${error.message}`);
    return null; // Or handle the error accordingly
  }
};

export const getTranscriptResults = async () => {
  try {
    const getTranscriptResponse = await fetch('https://classinsightapi.azurewebsites.net/getTranscriptResults', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json', // Set the appropriate content type
        // Add other headers if needed
      },
    });

    if (getTranscriptResponse.ok) {

      const getTranscriptResponseData = await getTranscriptResponse.json();
      const { status, transcriptResults } = getTranscriptResponseData;

      //console.log(getTranscriptResponseData);

      if (status === 'pending') {
        // If status is pending, wait for 3 seconds and then call the function again
        await new Promise(resolve => setTimeout(resolve, 3000));
        return getTranscriptResults();
      } else if (status === 'completed') {
        // If status is completed, return the transcript results
        return transcriptResults;
      } else {
        // Handle other statuses if needed
        console.error(`Unexpected status: ${status}`);
        return null;
      }

    } else {
      console.error(`Error: ${getTranscriptResponse.status} - ${getTranscriptResponse.statusText}`);
      return null; // Or handle the error accordingly
    }

  } catch (error) {
    console.error(`Unexpected error: ${error.message}`);
    return null; // Or handle the error accordingly
  }
}