// server.js
const express = require('express');
const { OpenAI } = require("openai");

const app = express();
const port = 3000;

app.get('/fetchChatCompletion', async (req, res) => {
  const openai = new OpenAI({
    apiKey: process.env.TheB_AI_API_KEY,
    baseURL: 'https://api.theb.ai/v1'
  });

  try {
    const result = await openai.chat.completions.create({
      model: 'claude-instant-1',
      stream: false,
      model_params: {
        temperature: 0.8
      },
      messages: [{ 
        role: 'user', 
        content: 'Say hello!' 
      }],
    });
    console.log(result);
    res.send(result);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred while processing the request.' });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
