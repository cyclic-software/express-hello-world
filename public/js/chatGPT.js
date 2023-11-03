
// chatGPT.js

// API-ключ от Chat GPT
const API_KEY = 'sk-76ADBqR4Eqsto6K8p8DNVGhlQi5BSQBGIxu8MKv2E6mla1KY';

// Функция для отправки сообщения на сервер Chat GPT и получения ответа
async function sendMessageToChatGPT(message) {
  try {
    const response = await fetch('https://chatgpt.cyclic.app', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
         'Authorization': 'Bearer sk-76ADBqR4Eqsto6K8p8DNVGhlQi5BSQBGIxu8MKv2E6mla1KY'
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

// Функция для отображения полученного ответа от Chat GPT в чате
function displayChatMessage(message) {
  const chatMessages = document.querySelector('.chat-messages');
  const messageElement = document.createElement('div');
  messageElement.classList.add('message');
  messageElement.innerText = message;
  chatMessages.appendChild(messageElement);
}

// Обработчик отправки формы
async function handleSubmit(event) {
  event.preventDefault(); // Предотвращаем отправку формы

  const messageInput = document.getElementById('message-input');
  const message = messageInput.value.trim();

  if (message !== '') {
    // Отправляем сообщение на Chat GPT
    const answer = await sendMessageToChatGPT(message);

    // Отображаем полученный ответ в чате
    displayChatMessage(answer);

    // Очищаем поле ввода
    messageInput.value = '';
  }
}

const response = jsonResponse.response;
console.log(response); // Вывод: "Привет, я чатбот!"

// Привязываем обработчик отправки формы к форме чата
const chatForm = document.getElementById('chat-form');
chatForm.addEventListener('submit', handleSubmit);
