import * as eve from 'evejs';
import { Itransaction } from '../types/Itransaction';
import { Iblock } from '../types/Iblock';

/**
 * @class this class is resposible for mining
 * @extends eve.Agent extends Agent class from eve framework
 */
export class Miner extends eve.Agent {
  /** @member {Itransaction[]} transactionPool stores the received pending transations */
  transactionPool: Itransaction[] = [];
  /** @member {Iblock[]} blockchain stores the blockchain datastructure */
  blockchain: Iblock[] = [];

  currentBlock: Iblock;

  minValue: number;
  maxPendingTransaction: number;
  numberOfTransaction: number;

  private visualizer: any;

  id: string;

  /**
   * @constructor
   * @param {string} id the id of the agent
   * @public
   */
  constructor(id: string) {
    super(id); // execute super constructor
    this.connect(eve.system.transports.getAll()); // connect to all transports configured by the system
    this.id = id;
  }

  /**
   * @function generate generate a block
   * @returns {Iblock} return the block that is generated, @see {@link Iblock}
   * @private
   */
  private generate(): any {
    const block: Iblock = {
      id: 'uuid',
      type: 'transaction',
      timestamp: new Date(),
      miner: 'uuid',
      previous: '',
      next: '',
      transactions: []
    };

    return block;
  }

  /**
   * @function publish publish a block
   * @param {string} to the id of the agents who will receive the block
   * @public
   */
  publish(to: string): void {
    const block: Iblock = this.generate();
    this.send(to, block);
  }

  /**
   * @function receive receive a transaction or a block
   * @param {string} from the id of the agents who sent the object
   * @param {any} object the id of the agents who will receive the block
   * @public
   */
  receive(from: string, object: any): void {
    if (object.type === 'transaction') {
      this.transactionPool.push(object);
      // Watchdog.onTransactionChange(this.id, object, this.visualizer);
    } else if (object.type === 'block') {
      object.previous = this.currentBlock.id;
      this.currentBlock.next = object.id;
      this.currentBlock = object;
      // Watchdog.onBlockChange(this.id, object, this.visualizer);
    }
  }

  /**
   * @function getPendingTransactions get pending transactions
   * @returns {Itransaction[]} return an array of transactions, @see {@link Itransaction}
   * @public
   */
  getPendingTransactions(): Itransaction[] {
    return this.transactionPool;
  }

  /**
   * @function getBlock get a block
   * @param {string} id the id of a block, or 'latest' for the latest block
   * @returns {Iblock} return a block, @see {@link Iblock}
   * @public
   */
  getBlock(id: string): Iblock {
    if (id === 'latest') {
      return this.latestBlock;
    } else {
      for (const block of this.minedBlocks) {
        if (block.id === id) {
          return block;
        }
      }
    }
  }

  setMiningStrategy(minValue: number, maxPendingTransaction: number, numberOfTransaction: number) {
    this.minValue = minValue;
    this.maxPendingTransaction = maxPendingTransaction;
    this.numberOfTransaction = numberOfTransaction;
  }

  initBlockchain() {
    this.visualizer.initBlockchain();
  }
}
