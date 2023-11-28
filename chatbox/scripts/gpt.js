const { OpenAIClient, AzureKeyCredential } = require("@azure/openai");
const config = require('./config');
const endpoint = config.AZURE_OPENAI_ENDPOINT;
const azureApiKey = config.AZURE_OPENAI_KEY;

// STEPS
// 1. Import this file
// 2. Give OpenAI the transcript using the sendTranscript() function
// 3. Whenever user asks a question, use the askGPT() function which will return the response
// 4. The messages array contains the conversation between the user and assistan. Use it to update the display

var messages = [
  {
    role: "system",
    content: `You are an assistant that helps users understand key points from a video. You will be provided video transcripts along with the timestamp. 
              Users will then ask you questions about the video. Answer their questions based on details in the transcript provided to you.
            
              Some other rules to follow:
              - If there are any point forms, please only use an ordered list format, i.e. "1., 2., 3., etc".
              - Keep responses as short as possible at only about 50 tokens.
              - Only answer questions related to the video only.
            `
  },
];

function sendTranscript(transcript) {
  messages.push(
    { role: "system", content: `The transcript for this video is as follows: ${JSON.stringify(transcript)}`}
  )
}

async function askGPT(prompt) {
  try {
    const client = new OpenAIClient(endpoint, new AzureKeyCredential(azureApiKey));
    const deploymentId = "ClassInsight-GPT";

    messages.push({ role: "user", content: prompt });

    const result = await client.getChatCompletions(deploymentId, messages);
    for (const choice of result.choices) {
      const replyMessage = choice.message.content;
      messages.push({ role: "assistant", content: replyMessage });
      return replyMessage;
    }
  } catch (err) {
    console.error("The sample encountered an error:", err);
    return "The sample encountered an error: " + err;
  }
}

module.exports = { askGPT, sendTranscript };