import * as eve from 'evejs';
import { Itransaction } from '../types/Itransaction';
import { Iblock } from '../types/Iblock';

/**
 * @class this class is resposible for generating blocks
 * @extends eve.Agent extends Agent class from eve framework
 */
export abstract class AbstractMiner extends eve.Agent {
  /** @member {Itransaction[]} pendingTransactions stores the received pending transations */
  protected pendingTransactions: Itransaction[] = [];
  /** @member {Iblock[]} minedBlocks stores the received mined blocks */
  protected minedBlocks: Iblock[] = [];
  /** @member {Iblock} latestBlock stores the received latest block */
  protected latestBlock: Iblock;

  protected visualizer: any;

  /**
   * @constructor
   * @param {string} id the id of the agent
   * @public
   */
  constructor(id: string, visualizer: any) {
    super(id); // execute super constructor
    this.connect(eve.system.transports.getAll()); // connect to all transports configured by the system
    this.visualizer = visualizer;
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
      previous: [],
      next: [],
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
      this.pendingTransactions.push(object);
      this.visualizer.appendTransaction(this.id, object);
    }
  }

  /**
   * @function getPendingTransactions get pending transactions
   * @returns {Itransaction[]} return an array of transactions, @see {@link Itransaction}
   * @public
   */
  getPendingTransactions(): Itransaction[] {
    return this.pendingTransactions;
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

  abstract stategy(): void;
}
