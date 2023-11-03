
// Common JavaScript code for both index.html and chat.html

function getChatGPTResponse(message) {
  const url = 'http://seohunter.ru/chatgpt'; // Replace with your server URL
  const apiKey = 'sk-LHH8z2N9GfY6oz2hwsRzVGhlQi5BSQk91va2dYXF8tLYsu6V'; // Replace with your API key

  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: {
        message: message
      },
      headers: {
        'Authorization': `Bearer ${apiKey}`
      }
    })
    .then(response => {
      resolve(response.data.reply);
    })
    .catch(error => {
      reject(error);
    });
  });
}

// Other shared functions or code can be added here
