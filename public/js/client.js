const chatLog = document.getElementById('chat-log');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');

sendButton.addEventListener('click', sendMessage);

function sendMessage() {
  const message = userInput.value.trim();

  if (message !== '') {
    appendMessage('user', message);
    userInput.value = '';

    getChatGPTResponse(message)
      .then(reply => {
        appendMessage('chatbot', reply);
      })
      .catch(error => {
        console.error('Error:', error);
        appendMessage('chatbot', 'An error occurred while processing the request.');
      });
  }
}

function appendMessage(sender, content) {
  const messageElement = document.createElement('div');
  messageElement.className = `message ${sender}`;
  messageElement.textContent = content;

  chatLog.appendChild(messageElement);
  chatLog.scrollTop = chatLog.scrollHeight;
}

function getChatGPTResponse(message) {
  const url = 'https://chatgpt.cyclic.app'; // Replace with your server URL
  const apiKey = 'sk-76ADBqR4Eqsto6K8p8DNVGhlQi5BSQBGIxu8MKv2E6mla1KY'; // Replace with your API key

  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: {
        message: message
      },
      headers: {
        'Authorization': `Bearer ${sk-76ADBqR4Eqsto6K8p8DNVGhlQi5BSQBGIxu8MKv2E6mla1KY}`
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
