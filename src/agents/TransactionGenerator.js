const Node = require('./Node');
const Transaction = require('../types/Transaction');
const Hash = require('../helper/Hash');

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
    this.type = 'generator';
  }

  /**
   * singleton
   */
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
  generate(reward) {
    const transaction = new Transaction(
      Hash.generateId(),
      'transaction',
      new Date(),
      '',
      reward,
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
  publish(reward) {
    const transaction = this.generate(reward);
    this.neighbors.forEach((neighbor) => {
      setTimeout(() => {
        this.send(neighbor.id, transaction);
      }, neighbor.delay * 1000);
    });
  }
}

module.exports = TransactionGenerator;
