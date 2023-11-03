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
    "stream": true // Изменено на "stream": true
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
    .then(response => response.body)
    .then(stream => {
      const reader = stream.getReader();
      
      reader.read().then(function processText({ done, value }) {
        if (done) return;
        
        const responseText = new TextDecoder().decode(value);
        const responseJson = JSON.parse(responseText);
        
        if (responseJson.choices && responseJson.choices.length > 0) {
          const assistantReply = responseJson.choices[0].message.content;
          displayMessage('assistant', assistantReply);
        }
        
        reader.read().then(processText);
      });
    })
    .catch(error => {
      console.error('Error:', error);
    });
  
  userMessageInput.value = '';
});

function displayMessage(role, content) {
  const messageElement = document.createElement('p');
  messageElement.innerHTML = `<strong>${role}: </strong>`;
  chatLog.appendChild(messageElement);
  
  let i = 0;
  const timer = setInterval(() => {
    if (i >= content.length) {
      clearInterval(timer);
    } else {
      messageElement.innerHTML += content.charAt(i);
      i++;
    }
  }, 50); // Изменено на 50 миллисекунд (можете изменить этот интервал по своему усмотрению)
}
