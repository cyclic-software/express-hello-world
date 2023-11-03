// chat.js

// Функция отправки сообщения на сервер Chat GPT и получения ответа
async function sendMessageToChatGPT(message) {
  try {
    const response = await fetch('https://chatgpt.cyclic.app', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sk-76ADBqR4Eqsto6K8p8DNVGhlQi5BSQBGIxu8MKv2E6mla1KY}`
      },
      body: JSON.stringify({
        message: message
      })
    });

    if (!response.ok) {
      throw new Error('Request failed');
    }

    const data = await response.json();
    return data.answer;
  } catch (error) {
    console.log('Error:', error.message);
    return 'Sorry, I am unable to respond at the moment.';
  }
}

function getChatGPTResponse(message) {
  const url = 'https://chatgpt.cyclic.app/'; // Replace with your server URL

  // остальной код
}

// Обработчик отправки сообщения из формы чата
function handleChatFormSubmit(event) {
  event.preventDefault();
  const messageInput = document.getElementById('message-input');
  const message = messageInput.value.trim();
  if (message !== '') {
    appendMessageToChat('You: ' + message);
    messageInput.value = '';
    sendMessageToChatGPT(message)
      .then(response => {
        appendMessageToChat('ChatBot: ' + response);
      })
      .catch(error => {
        console.log(error);
        appendMessageToChat('Sorry, there was an error processing your request.');
      });
  }
}

// Функция добавления сообщения в окно чата
function appendMessageToChat(message) {
  const chatMessages = document.querySelector('.chat-messages');
  const messageElement = document.createElement('div');
  messageElement.textContent = message;
  chatMessages.appendChild(messageElement);
}

// Назначение обработчика события отправки формы чата
const chatForm = document.getElementById('chat-form');
chatForm.addEventListener('submit', handleChatFormSubmit);
