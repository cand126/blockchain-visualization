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
  socket.on('init blockchain', (data) => {
    let Simulator = require('./src/Simulator');
    let blockchain = Simulator.getInstance().getBlockchain(data.nodeId);
    socket.emit('update blockchain', {
      nodeId: data.nodeId,
      blocks: blockchain,
    });
  });
  socket.on('init transaction pool', (data) => {
    let Simulator = require('./src/Simulator');
    let transactionPoolLength = Simulator.getInstance().getTransactionPoolLength(data.nodeId);
    socket.emit('update transaction pool', {
      nodeId: data.nodeId,
      length: transactionPoolLength,
    });
  });
});

appSocket.updateVisualization = (action, data) => {
  io.sockets.emit(action, data);
};

module.exports = appSocket;
