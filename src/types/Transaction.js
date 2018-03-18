/**
 * Data structure for blocks.
 * @interface Transaction
 * @property {string} id        - The id of the transaction
 * @property {string} type      - Is always "transaction", to indicate this object is a transaction
 * @property {Date} timestamp   - The timestamp of the transaction, should be the time when the trasaction is created
 * @property {string} message   - Arbitrary message that can be used in the blockchain system.
 * @property {number} reward    - The number of reward that a miner will gain.
 * @property {number} privilege - The number of privilege of the transaction.
 * @public
 */
class Transaction {
  /**
   * @constructor
   * @param {string} id
   * @param {string} type
   * @param {Date} timestamp
   * @param {string} message
   * @param {number} reward
   * @param {number} privilege
   */
  constructor(
    id,
    type,
    timestamp,
    message,
    reward,
    privilege
  ) {
    this.id = id;
    this.type = type;
    this.timestamp = timestamp;
    this.message = message;
    this.reward = reward;
    this.privilege = privilege;
  }
}

module.exports = Transaction;
