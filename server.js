const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));

io.on('connection', socket => {
  socket.on('chat message', msg => {
    socket.broadcast.emit('chat message', msg); // Relay encrypted message
  });
});

http.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
