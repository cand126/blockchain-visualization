const eve = require('evejs');
const Block = require('../types/Block');
const Watchdog = require('../Watchdog');
const Hash = require('../helper/Hash');

/**
 * Defines the common functions of nodes.
 * @class
 * @abstract
 * @extends eve.Agent
 * @see {@link http://eve.almende.com/implementations/javascript/gettingstarted.html evejs}
 */
class AbstractNode extends eve.Agent {
  /**
   * @constructor
   * @private
   * @param {string} nodeId
   */
  constructor(nodeId) {
    super(nodeId);
    this.connect(eve.system.transports.getAll()); // connect to all transports configured by the system
    this.transactionPool = [];
    this.blockchain = [];
    this.currentBlock = null;
    this.neighbors = [];
  }

  /**
   * Initialize the blockchain.
   * @function
   * @public
   */
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

    this.currentBlock = block;
    this.blockchain.push(this.currentBlock);
  }

  /**
   * Receive a transaction or a block.
   * @function
   * @param {string} from   - The id of the agent who sent the object.
   * @param {object} object - The received data.
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
      this.receiveBlock(object);
    }
  }

  /**
   * Receive a transaction.
   * @function
   * @param {object} transaction
   * @abstract
   */
  receiveTransaction(transaction) {}

  /**
   * Receive a block.
   * @function
   * @param {object} block
   * @private
   */
  receiveBlock(block) {
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

    Watchdog.getInstance().onDataChange('update blockchain', {
      nodeId: this.id,
      blocks: [block],
    });
  }

  /**
   * Publish a block.
   * @function
   * @param {object} block
   * @public
   */
  publish(block) {
    this.neighbors.forEach((neighbor) => {
      setTimeout(() => {
        this.send(neighbor.id, block);
      }, neighbor.delay * 1000);
    });
  }

  /**
   * Add a neighbor.
   * @function
   * @param {string} nodeId
   * @param {string} name
   * @param {number} delay
   * @public
   */
  addNeighbor(nodeId, name, delay) {
    this.neighbors.push({
      id: nodeId,
      name: name,
      delay: delay,
    });
  }
}

module.exports = AbstractNode;