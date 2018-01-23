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

  constructor(id, name, color) {
    super(id);
    this.connect(Eve.system.transports.getAll()); // connect to all transports configured by the system
    this.id = id;
    this.name = name;
    this.color = color;
    this.transactionPool = [];
    this.blockchain = [];
    this.watchdog = Watchdog.getInstance();
    this._initBlockchain();
  }

  /**
   * @function generate generate a block
   * @returns {Iblock} return the block that is generated, @see {@link Iblock}
   * @private
   */
  generate() {
    let block = new Block(
      Hash.generateId(),
      'block',
      new Date(),
      this.id,
      '',
      '',
      -1,
      []
    );

    return block;
  }

  /**
   * @function publish publish a block
   * @param {string} to the id of the agents who will receive the block
   * @public
   */
  publish(to, delay) {
    let block = this.generate();
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
      this.watchdog.onTransactionChange(this.id, object);
    } else if (object.type === 'block') {
      // a block from a miner
      if (object.previous === '') {
        object.previous = this.currentBlock.id;
        object.layer = this.currentBlock.layer + 1;
        this.currentBlock.next = object.id;
        this.currentBlock = object;
        this.blockchain.push(this.currentBlock);
      }
      // consensus protocol: add longer blockchain

      this.watchdog.onBlockChange(this.id, object);
    }
  }

  setMiningStrategy(minValue, maxPendingTransaction, numberOfTransaction) {
    this.minValue = minValue;
    this.maxPendingTransaction = maxPendingTransaction;
    this.numberOfTransaction = numberOfTransaction;
  }

  _initBlockchain() {
    this.currentBlock = new Block(
      Hash.generateNull(),
      'block',
      new Date(),
      Hash.generateNull(),
      Hash.generateNull(),
      '',
      0,
      []
    );
    this.blockchain.push(this.currentBlock);
  }
}

export default Miner;
