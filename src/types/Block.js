/**
 * Data structure for blocks.
 * @interface Block
 * @property {string}        id           - The id of the block.
 * @property {string}        type         - Is always "block", to indicate this object is a block.
 * @property {Date}          timestamp    - The timestamp of the block, should be the time when the block is created.
 * @property {string}        miner        - The id of the node who mined the block.
 * @property {string}        previous     - The id of the previous block in the blockchain.
 * @property {number}        layer        - The height of the block in the blockchain.
 * @property {string}        color        - The color of the block.
 * @property {transaction[]} transactions - The array of the transactions which is contained in the block.
 * @see {@link Transaction}
 * @public
 */
class Block {
  /**
   * @constructor
   * @param {string} id
   * @param {string} type
   * @param {Date} timestamp
   * @param {string} miner
   * @param {string} previous
   * @param {number} layer
   * @param {string} color
   * @param {transaction[]} transactions
   */
  constructor(
    id,
    type,
    timestamp,
    miner,
    previous,
    layer,
    color,
    transactions
  ) {
    this.id = id;
    this.type = type;
    this.timestamp = timestamp;
    this.miner = miner;
    this.previous = previous;
    this.layer = layer;
    this.color = color;
    this.transactions = transactions;
  }
}

module.exports = Block;
