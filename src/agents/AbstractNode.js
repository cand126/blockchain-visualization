const eve = require('evejs');
const Block = require('../types/Block');
const Watchdog = require('../Watchdog');
const Hash = require('../helper/Hash');

class AbstractNode extends eve.Agent {
  constructor(nodeId) {
    super(nodeId);
    this.connect(eve.system.transports.getAll()); // connect to all transports configured by the system
    this.blockchain = [];
    this.currentBlock = null;
    this.neighbors = [];
  }

  initBlockchain() {
    const block = new Block(
      Hash.generateNull(),
      'block',
      new Date(),
      Hash.generateNull(),
      'null',
      0,
      '#91989F',
      []
    );

    this.blockchain = [];
    this.currentBlock = block;
    this.blockchain.push(this.currentBlock);
  }

  receive(from, object) {
    if (object.type === 'transaction') {
      this._receiveTransaction(object);
    } else if (object.type === 'block') {
      for (let i = 0; i < this.blockchain.length; i++) {
        // repeated blocks
        if (this.blockchain[i].id === object.id) {
          return;
        }
      }
      this._receiveBlock(object);
    }
  }

  _receiveTransaction(transaction) {}

  _receiveBlock(block) {
    if (block.previous === '') {
      // a new block
      block.previous = this.currentBlock.id;
      block.layer = this.currentBlock.layer + 1;
      this.currentBlock = block;
    } else if (this.currentBlock.layer < block.layer) {
      this.currentBlock = block;
    }

    this.blockchain.push(block);
    this.publish(block);
    this._calculateReward();

    Watchdog.getInstance().onDataChange('update blockchain', {
      nodeId: this.id,
      blocks: [block],
      currentBlock: this.currentBlock.id,
    });
  }

  publish(block) {
    this.neighbors.forEach((neighbor) => {
      setTimeout(() => {
        this.send(neighbor.id, block);
      }, neighbor.delay * 1000);
    });
  }

  _calculateReward() {}

  addNeighbor(nodeId, name, delay) {
    this.neighbors.push({
      id: nodeId,
      name: name,
      delay: delay,
    });
  }

  deleteNeighbor(nodeId) {
    for (let i = 0; i < this.neighbors.length; i++) {
      if (this.neighbors[i].id === nodeId) {
        this.neighbors.splice(i, 1);
        i -= 1;
      }
    }
  }
}

module.exports = AbstractNode;
