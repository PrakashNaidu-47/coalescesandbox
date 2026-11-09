const rooms = new Map();

function generateRoomId() {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}

function checkWinner(board) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];
  for (const [a, b, c] of lines) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  if (board.every(cell => cell !== null)) {
    return 'draw';
  }
  return null;
}

function createRoom(socketId) {
  const roomId = generateRoomId();
  const room = {
    roomId,
    board: Array(9).fill(null),
    turn: 'X',
    status: 'waiting',
    winner: null,
    players: {
      X: socketId,
      O: null
    }
  };
  rooms.set(roomId, room);
  return roomId;
}

function joinRoom(socketId, roomId) {
  const room = rooms.get(roomId);
  if (!room) {
    throw new Error('Room not found');
  }
  if (room.players.O && room.players.X !== socketId) {
    throw new Error('Room is full');
  }
  if (!room.players.O && room.players.X !== socketId) {
    room.players.O = socketId;
  }
  if (room.players.X && room.players.O) {
    room.status = 'in_progress';
  }
  return room;
}

function handlePlayerMove(roomId, socketId, index) {
  const room = rooms.get(roomId);
  if (!room) throw new Error('Room not found');
  if (room.status !== 'in_progress') throw new Error('Game not in progress');

  const playerRole = room.players.X === socketId ? 'X' : room.players.O === socketId ? 'O' : null;
  if (!playerRole) throw new Error('Player not in room');
  if (room.turn !== playerRole) throw new Error('Not your turn');
  if (index < 0 || index > 8 || room.board[index] !== null) throw new Error('Invalid move');

  room.board[index] = playerRole;
  const result = checkWinner(room.board);
  if (result === 'draw') {
    room.status = 'draw';
  } else if (result) {
    room.status = 'won';
    room.winner = result;
  } else {
    room.turn = room.turn === 'X' ? 'O' : 'X';
  }
  return room;
}

function removePlayer(socketId) {
  for (const [roomId, room] of rooms.entries()) {
    if (room.players.X === socketId || room.players.O === socketId) {
      rooms.delete(roomId);
      return { roomId, room };
    }
  }
  return null;
}

module.exports = { createRoom, joinRoom, handlePlayerMove, removePlayer };