const socket = io();

const lobbyEl = document.getElementById('lobby');
const gamePanelEl = document.getElementById('game-panel');
const createBtn = document.getElementById('create-btn');
const joinBtn = document.getElementById('join-btn');
const roomInput = document.getElementById('room-input');
const displayRoom = document.getElementById('display-room');
const statusEl = document.getElementById('status');
const boardEl = document.getElementById('board');
const errorMsg = document.getElementById('error-msg');
const cells = document.querySelectorAll('.cell');

let currentRoomId = null;

createBtn.addEventListener('click', () => {
  socket.emit('create-room');
});

joinBtn.addEventListener('click', () => {
  const roomId = roomInput.value.trim().toUpperCase();
  if (roomId) {
    currentRoomId = roomId;
    socket.emit('join-room', roomId);
  }
});

cells.forEach(cell => {
  cell.addEventListener('click', () => {
    const index = parseInt(cell.getAttribute('data-index'));
    if (currentRoomId) {
      socket.emit('player-move', { roomId: currentRoomId, index });
    }
  });
});

socket.on('room-created', (roomId) => {
  currentRoomId = roomId;
  displayRoom.textContent = roomId;
  lobbyEl.classList.add('hidden');
  gamePanelEl.classList.remove('hidden');
});

socket.on('game-update', (room