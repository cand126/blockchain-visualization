var eve = require('evejs');
var Block = require('../types/Block');
var Watchdog = require('../Watchdog');
var Hash = require('../helper/Hash');

/**
 * this class is resposible for mining.
 * @class
 * @extends eve.Agent
 */
class Node extends eve.Agent {
  /**
   * @public
   */
  constructor(id) {
    super(id);
    // connect to all transports configured by the system
    this.connect(eve.system.transports.getAll());
    this.transactionPool = [];
    this.blockchain = [];
    this.currentBlock = null;
    this.layer = 0;
    this.neighbors = [];
    this.watchdog = Watchdog.getInstance();
  }

  /**
   * @function receive receive a transaction or a block
   * @param {string} from the id of the agents who sent the object
   * @param {any} object the id of the agents who will receive the block
   * @public
   */
  receive(from, object) {
    if (object.type === 'transaction') {
      this.receiveTransaction(object);
    } else if (object.type === 'block') {
      for (let i = 0; i < this.blockchain.length; i++) {
        // repeated blocks
        if (this.blockchain[i].id === object.id) {
          return;
        }
      }
      this.addBlock(object, from);
    } else if (object === 'blockchain') {
      // consensus protocol
      let currentBlockchain = {
        type: 'blockchain',
        blocks: [],
      };
      let block = this.currentBlock;
      while (block.id !== Hash.generateNull()) {
        currentBlockchain.blocks.push(block);
        block = this.blockchain.find((element) => {
          if (element.id === block.previous) {
            return element;
          }
        });
      }
      // TODO: add the starting block

      this.send(from, currentBlockchain);
    } else if (object.type = 'blockchain') {
      while (object.blocks.length > 0) {
        const block = object.blocks.pop();
        const checkBlock = this.blockchain.find((element) => {
          if (element.id === block.id) {
            return element;
          }
        });
        if (typeof checkBlock === 'undefined') {
          this.blockchain.push(block);
          this.watchdog.onBlockChange(this, block);
        }
      }
    }
  }

  /**
   * @public
   */
  receiveTransaction(transaction) {}

  /**
   * @public
   */
  addBlock(block, from = null) {
    if (block.previous === '') {
      // a block from a miner
      block.previous = this.currentBlock.id;
      block.layer = this.currentBlock.layer + 1;
      // this.currentBlock.next = block.id;
    } else {
      // consensus protocol: add longer blockchain
      const previousBlock = this.blockchain.find((element) => {
        if (element.id === block.previous) {
          return element;
        }
      });
      if (typeof previousBlock === 'undefined') {
        this.consensusProtocol(from);
        return;
      }
    }
    if (this.layer < block.layer) {
      this.currentBlock = block;
      this.layer = block.layer;
      this.blockchain.push(this.currentBlock);
      this.watchdog.onBlockChange(this, this.currentBlock);
    } else {
      this.blockchain.push(block);
      this.watchdog.onBlockChange(this, block);
    }
  }

  /**
   * @public
   */
  initBlockchain() {
    this.currentBlock = new Block(
      Hash.generateNull(),
      'block',
      new Date(),
      Hash.generateNull(),
      Hash.generateNull(),
      '',
      0,
      0x91989F, []
    );
    this.blockchain.push(this.currentBlock);
    this.watchdog.onBlockChange(this, this.currentBlock);
  }

  /**
   * @public
   */
  addNeighbor(id, name, delay) {
    this.neighbors.push({
      id: id,
      name: name,
      delay: delay,
    });
  }
}

module.exports = Node;
