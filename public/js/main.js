
// Common JavaScript code for both index.html and chat.html

function getChatGPTResponse(message) {
  const url = 'https://chatgpt.cyclic.app'; // Replace with your server URL
  const apiKey = 'sk-76ADBqR4Eqsto6K8p8DNVGhlQi5BSQBGIxu8MKv2E6mla1KY'; // Replace with your API key

  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: {
        message: message
      },
      headers: {
          'Authorization': 'Bearer sk-76ADBqR4Eqsto6K8p8DNVGhlQi5BSQBGIxu8MKv2E6mla1KY'
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
