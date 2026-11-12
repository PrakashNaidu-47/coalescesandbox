self.onmessage = (e: MessageEvent) => {
  const { command } = e.data;
  if (command === 'uci') {
    self.postMessage('uciok');
  } else if (command === 'isready') {
    self.postMessage('readyok');
  } else if (command.startsWith('position')) {
    // Position setup logic
  } else if (command.startsWith('go')) {
    self.postMessage('bestmove e2e4');
  }
};
