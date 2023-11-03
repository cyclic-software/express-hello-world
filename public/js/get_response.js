
const axios = require('axios');
let data = JSON.stringify({
  "model": "claude-2",
  "messages": [
    {
      "role": "user",
      "content": "How are you?"
    }
  ],
  "stream": false,
  "model_params": {
    "temperature": 1
  }
});

let config = {
  method: 'post',
  maxBodyLength: Infinity,
  url: 'https://api.theb.ai/v1/chat/completions',
  // url: 'https://api.baizhi.ai/v1/chat/completions',
  headers: {
    'Authorization': 'Bearer sk-76ADBqR4Eqsto6K8p8DNVGhlQi5BSQBGIxu8MKv2E6mla1KY',
    'Content-Type': 'application/json'
  },
  data : data
};

axios.request(config)
.then((response) => {
  console.log(JSON.stringify(response.data));
})
.catch((error) => {
  console.log(error);
});

const { OpenAI } = require("openai");

const openai = new OpenAI({
  apiKey: process.env.TheB_AI_API_KEY,
  baseURL: 'https://api.theb.ai/v1'
  // baseURL: 'https://api.baizhi.ai/v1'
});

async function fetchChatCompletion() {
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
}

fetchChatCompletion();
