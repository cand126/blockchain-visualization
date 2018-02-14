import Node from './Node';
import Transaction from '../types/Transaction';
import Hash from '../helper/Hash';

/**
 * @class this class is resposible for generating transactions
 * @extends Eve.Agent extends Agent class from eve framework
 */
class TransactionGenerator extends Node {
  /**
   * @constructor
   * @public
   */
  constructor(id) {
    super(id);
  }

  // singleton
  static getInstance() {
    if (!this.instance) {
      this.instance = new TransactionGenerator(Hash.generateId());
    }
    return this.instance;
  }

  /**
   * @function generate generate a transaction
   * @returns {Itransaction} return the transaction that is generated, @see {@link Itransaction}
   * @private
   */
  generate() {
    const transaction = new Transaction(
      Hash.generateId(),
      'transaction',
      new Date(),
      '',
      10,
      0
    );

    return transaction;
  }

  /**
   * @function publish publish a transaction with a delay time
   * @param {string} to the id of the agents who will receive the transaction
   * @param {number} delay the number of time to delay
   * @public
   */
  publish(to, delay) {
    const transaction = this.generate();
    setTimeout(() => {
      this.send(to, transaction);
    }, delay * 1000);
  }
}

export default TransactionGenerator;
