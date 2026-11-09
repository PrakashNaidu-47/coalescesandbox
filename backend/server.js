const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');
const { createRoom, joinRoom, handlePlayerMove, removePlayer } = require('./gameManager');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.join(__dirname, '../frontend')));

io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on('create-room', () => {
    try {
      const roomId = createRoom(socket.id);
      socket.join(roomId);
      socket.emit('room-created', roomId);
      const room = joinRoom(socket.id, roomId);
      socket.emit('game-update', room);
    } catch (err) {
      socket.emit('error-message', err.message);
    }
  });

  socket.on('join-room', (roomId) => {
    try {
      const room = joinRoom(socket.id, roomId);
      socket.join(roomId);
      io.to(roomId).emit('game-update', room);
    } catch (err) {
      socket.emit('error-message', err.message);
    }
  });

  socket.on('player-move', ({ roomId, index }) => {
    try {
      const room = handlePlayerMove(roomId, socket.id, index);
      io.to(roomId).emit('game-update', room);
    } catch (err) {
      socket.emit('error-message', err.message);
    }
  });

  socket.on('disconnect', () => {
    const res = removePlayer(socket.id);
    if (res) {
      io.to(res.roomId).emit('error-message', 'Opponent disconnected. Room closed.');
      io.to(res.roomId).emit('game-update', { ...res.room, status: 'waiting' });
    }
    console.log(`User disconnected: ${socket.id}`);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});