import Eve from 'evejs';
import Block from '../types/Block';
import Watchdog from '../watchdog/Watchdog';
import Hash from '../helper/Hash';

/**
 * @class this class is resposible for mining
 * @extends Eve.Agent extends Agent class from eve framework
 */
class Miner extends Eve.Agent {
  minValue;
  maxPendingTransaction;
  numberOfTransaction;

  constructor(color) {
    super(); // uuid
    this.connect(Eve.system.transports.getAll()); // connect to all transports configured by the system
    this.color = color;
    this.transactionPool = [];
    this.blockchain = [];
    this.currentBlock = null;
    this.layer = 0;
    this.neighbors = [];
    this.watchdog = Watchdog.getInstance();
  }

  /**
   * @function generate generate a block
   * @returns {Iblock} return the block that is generated, @see {@link Iblock}
   * @private
   */
  generate() {
    const block = new Block(
      Hash.generateId(),
      'block',
      new Date(),
      this.id,
      '',
      '', -1,
      this.color, []
    );

    return block;
  }

  /**
   * @function publish publish a block
   * @param {string} to the id of the agents who will receive the block
   * @public
   */
  publish(to, delay) {
    const block = this.generate();
    setTimeout(() => {
      this.send(to, block);
    }, delay * 1000);
  }

  /**
   * @function receive receive a transaction or a block
   * @param {string} from the id of the agents who sent the object
   * @param {any} object the id of the agents who will receive the block
   * @public
   */
  receive(from, object) {
    if (object.type === 'transaction') {
      this.transactionPool.push(object);
      this.watchdog.onTransactionChange(this, object);
    } else if (object.type === 'block') {
      console.log(this.blockchain);
      for (let i = 0; i < this.blockchain.length; i++) {
        // repeated blocks
        if (this.blockchain[i].id === object.id) {
          return;
        }
      }
      this.addBlock(object);
      this.watchdog.onBlockChange(this, object);
    }
  }

  addBlock(block) {
    if (block.previous === '') {
      // a block from a miner
      block.previous = this.currentBlock.id;
      block.layer = this.currentBlock.layer + 1;
      this.currentBlock.next = block.id;
      this.currentBlock = block;
      this.layer = block.layer;
      this.blockchain.push(this.currentBlock);

      // publish
      this.neighbors.forEach((node) => {
        this.send(node, block);
      });
    } else {
      // consensus protocol: add longer blockchain
    }
  }

  setMiningStrategy(minValue, maxPendingTransaction, numberOfTransaction) {
    this.minValue = minValue;
    this.maxPendingTransaction = maxPendingTransaction;
    this.numberOfTransaction = numberOfTransaction;
  }

  initBlockchain() {
    this.currentBlock = new Block(
      Hash.generateNull(),
      'block',
      new Date(),
      Hash.generateNull(),
      Hash.generateNull(),
      '',
      0,
      '0x91989F', []
    );
    this.blockchain.push(this.currentBlock);
    this.watchdog.onBlockChange(this, this.currentBlock);
  }
}

export default Miner;
