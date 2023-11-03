
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
    'Authorization': 'Bearer $API_KEY',
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
