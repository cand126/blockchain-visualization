let io = require('socket.io')();
let appSocket = {};
appSocket.io = io;

io.on('connection', (socket) => {
  // Receive requests for updating nodes
  socket.on('update node', (data) => {
    const Simulator = require('./src/Simulator');
    const success = Simulator.getInstance().updateNode(data);
    if (success) {
      socket.emit('finish', {
        status: 'success',
      });
    }
  });

  // Receive requests for updating strategies of miners
  socket.on('update strategy', (data) => {
    const Simulator = require('./src/Simulator');
    const success = Simulator.getInstance().updateStrategy(data);
    if (success) {
      socket.emit('finish', {
        status: 'success',
      });
    }
  });

  // Receive requests for publishing transactions
  socket.on('publish transaction', (data) => {
    const Simulator = require('./src/Simulator');
    Simulator.getInstance().publishTransaction(data);
  });

  // Receive requests for getting blockchains
  socket.on('get blockchain', (data) => {
    const Simulator = require('./src/Simulator');
    const blockchain = Simulator.getInstance().getBlockchain(data.nodeId);
    const currentBlock = Simulator.getInstance().getCurrentBlock(data.nodeId);
    socket.emit('update blockchain', {
      nodeId: data.nodeId,
      blocks: blockchain,
      currentBlock: currentBlock.id,
    });
  });

  // Receive requests for getting transaction pools
  socket.on('get transaction pool', (data) => {
    const Simulator = require('./src/Simulator');
    const transactionPoolLength = Simulator.getInstance().getTransactionPoolLength(data.nodeId);
    socket.emit('update transaction pool', {
      nodeId: data.nodeId,
      length: transactionPoolLength,
    });
  });

  // Receive requests for getting rewards
  socket.on('get reward', (data) => {
    const Simulator = require('./src/Simulator');
    const reward = Simulator.getInstance().getReward(data.nodeId);
    socket.emit('update reward', {
      nodeId: data.nodeId,
      reward: reward,
    });
  });

  // Receive requests for adding nodes
  socket.on('add node', (data) => {
    const Simulator = require('./src/Simulator');
    Simulator.getInstance().addNodeByType(data.nodeType);
    socket.emit('reload', {});
  });

  // Receive requests for deleting nodes
  socket.on('delete node', (data) => {
    const Simulator = require('./src/Simulator');
    Simulator.getInstance().deleteNode(data.nodeId);
    socket.emit('reload', {});
  });

  // Receive requests for initializing the blockchain system
  socket.on('init blockchain system', (data) => {
    const Simulator = require('./src/Simulator');
    Simulator.getInstance().init(data);
    socket.emit('reload', {});
  });

  // Receive requests for reseting the blockchain system
  socket.on('reset blockchain system', (data) => {
    const Simulator = require('./src/Simulator');
    Simulator.reset();
    socket.emit('reload', {});
  });
});

appSocket.updateVisualization = (action, data) => {
  io.sockets.emit(action, data);
};

module.exports = appSocket;
