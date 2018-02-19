let io = require('socket.io')();

let appSocket = {};
appSocket.io = io;

io.on('connection', (socket) => {
  socket.on('update node', (data) => {
    let Simulator = require('./src/Simulator');
    const success = Simulator.getInstance().updateNode(data);
    if (success) {
      socket.emit('finish', {
        status: 'success',
      });
    }
  });
  socket.on('update strategy', (data) => {
    let Simulator = require('./src/Simulator');
    const success = Simulator.getInstance().updateStrategy(data);
    if (success) {
      socket.emit('finish', {
        status: 'success',
      });
    }
  });
  socket.on('publish transaction', (data) => {
    let Simulator = require('./src/Simulator');
    Simulator.getInstance().publishTransaction(data);
  });
});

appSocket.updateVisualization = (action, data) => {
  io.sockets.emit(action, data);
};

module.exports = appSocket;
