const axios = require('axios');

let config = {
  method: 'post',
  maxBodyLength: Infinity,
  url: 'https://api.theb.ai/v1/chat/completions',
  // url: 'https://api.baizhi.ai/v1/chat/completions',
  headers: {
    'Authorization': 'Bearer sk-76ADBqR4Eqsto6K8p8DNVGhlQi5BSQBGIxu8MKv2E6mla1KY',
    'Content-Type': 'application/json'
  },
  data: JSON.stringify({
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
  })
};

axios.request(config)
  .then((response) => {
    console.log(JSON.stringify(response.data));
  })
  .catch((error) => {
    console.log(error);
  });
