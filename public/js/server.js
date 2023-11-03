// server.js

const express = require('express');
const app = express();
const port = 3000;

// Разрешаем обслуживать статические файлы из папки "public"
app.use(express.static('public'));

// Обработчик главной страницы
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Обработчик страницы административной панели
app.get('/admin', (req, res) => {
  res.sendFile(__dirname + '/admin.html');
});

// Обработчик страницы чата
app.get('/chat', (req, res) => {
  res.sendFile(__dirname + '/chat.html');
});

// Запускаем сервер
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
