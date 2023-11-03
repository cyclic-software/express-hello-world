// client.js

// Функция для добавления сообщения в список сообщений чата
function addMessageToChat(message) {
  const chatMessages = document.querySelector('.chat-messages');
  const messageElement = document.createElement('div');
  messageElement.classList.add('message');
  messageElement.innerText = message;
  chatMessages.appendChild(messageElement);
}

// Функция для отправки сообщения на сервер
function sendMessage(message) {
  // Здесь можно добавить логику для отправки сообщения на сервер
  // Пример: просто добавляем сообщение в список сообщений чата
  addMessageToChat('Вы: ' + message);
}

// Обработчик отправки формы
function handleSubmit(event) {
  event.preventDefault(); // Предотвращаем отправку формы

  const messageInput = document.getElementById('message-input');
  const message = messageInput.value.trim();

  if (message !== '') {
    // Отправляем сообщение
    sendMessage(message);

    // Очищаем поле ввода
    messageInput.value = '';
  }
}

// Привязываем обработчик отправки формы к форме чата
const chatForm = document.getElementById('chat-form');
chatForm.addEventListener('submit', handleSubmit);
