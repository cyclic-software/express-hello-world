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

const response = await axios.post('https://api.theb.ai/v1', {
  model: 'gpt-3.5',
  messages: [{ role: 'system', content: 'You are a helpful assistant.' }, { role: 'user', content: message }],
}, {
  headers: {
    'Content-Type': 'application/json',
     'Authorization': 'ApiKEY TOKEN sk-76ADBqR4Eqsto6K8p8DNVGhlQi5BSQBGIxu8MKv2E6mla1KY'
  },
});

// Запускаем сервер
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
