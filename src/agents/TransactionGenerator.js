const AbstractNode = require('./AbstractNode');
const Transaction = require('../types/Transaction');
const Hash = require('../helper/Hash');

/**
 * Responsible for publishing transactions.
 * @class
 * @public
 * @extends AbstractNode
 */
class TransactionGenerator extends AbstractNode {
  /**
   * @constructor
   * @public
   * @param {string} id
   */
  constructor(id) {
    super(id);
    this.type = 'generator';
  }

  /**
   * Generates a transaction.
   * @function
   * @param {number} reward
   * @return {object}
   * @public
   * @see {@link Transaction}
   */
  generate(reward) {
    const transaction = new Transaction(
      Hash.generateId(),
      'transaction',
      new Date(),
      Number(reward),
      0
    );

    return transaction;
  }

  /**
   * Publish a transaction.
   * @function
   * @param {Transaction} transaction
   * @public
   */
  publish(transaction) {
    this.neighbors.forEach((neighbor) => {
      setTimeout(() => {
        this.send(neighbor.id, transaction);
      }, neighbor.delay * 1000);
    });
  }
}

module.exports = TransactionGenerator;
