const Simulator = require('./src/Simulator');
const io = require('socket.io')();
let appSocket = {};

appSocket.io = io;

io.on('connection', (socket) => {
  socket.on('update node', (data) => {
    const success = Simulator.getInstance().updateNode(data);
    if (success) {
      socket.emit('finish', {
        status: 'success',
      });
    }
  });
  socket.on('update strategy', (data) => {
    const success = Simulator.getInstance().updateStrategy(data);
    if (success) {
      socket.emit('finish', {
        status: 'success',
      });
    }
  });
});

module.exports = appSocket;
