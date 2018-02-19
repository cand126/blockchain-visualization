/**
 * @interface Transaction a data type for transactions
 * @property {string} id the id of the transaction
 * @property {string} type is always "transaction", to indicate this object is a transaction
 * @property {Date} timestamp the timestamp of the transaction, should be the time when the trasaction is created
 * @example
 * {
 *     id: ,
 *     type: "transaction",
 *     timestamp: ,
 *     content: {
 *         from: ,
 *         to: ,
 *         message:
 *     }
 * }
 */
class Transaction {
  /**
   * @public
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