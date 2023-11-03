const httpServer = require('http-server');
const server = httpServer.createServer();
const port = 3000; // Укажите порт по вашему усмотрению

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
