const chatForm = document.getElementById('chatForm');
const userMessageInput = document.getElementById('userMessage');
const chatLog = document.getElementById('chatLog');

chatForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const userMessage = userMessageInput.value;

  const requestBody = {
    "model": "gpt-3.5-turbo",
    "messages": [
      {
        "role": "user",
        "content": userMessage
      }
    ],
    "stream": false
  };

  const requestOptions = {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer sk-76ADBqR4Eqsto6K8p8DNVGhlQi5BSQBGIxu8MKv2E6mla1KY', // Замените $API_KEY на ваш ключ авторизации
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(requestBody)
  };

  fetch('https://api.theb.ai/v1/chat/completions', requestOptions)
    .then(response => response.json())
    .then(data => {
      const assistantReply = data.choices[0].message.content;
      displayMessage('assistant', assistantReply);
    })
    .catch(error => {
      console.error('Error:', error);
    });

  userMessageInput.value = '';
});

function displayMessage(role, content) {
  const messageElement = document.createElement('p');
  messageElement.innerHTML = `<strong>${role}: </strong>${content}`;
  chatLog.appendChild(messageElement);
}
