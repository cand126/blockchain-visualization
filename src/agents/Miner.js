const AbstractNode = require('./AbstractNode');
const Block = require('../types/Block');
const Transaction = require('../types/Transaction');
const Hash = require('../helper/Hash');
const Watchdog = require('../Watchdog');

/**
 * Represents a miner.
 * @class
 * @public
 * @extends AbstractNode
 */
class Miner extends AbstractNode {
  /**
   * @constructor
   * @public
   * @param {string} id
   * @param {string} name
   * @param {string} color
   * @param {number} miningTime - The length of time for mining.
   * @param {number} minValue   - The minimum value of a transaction that can be mined.
   * @param {number} mineNumber - The number of transactions that are included in a block.
   * @param {number} maxPending - The number of maximum pending transactions in the transactin pool.
   */
  constructor(id, name, color, miningTime, minValue, mineNumber, maxPending) {
    super(id);
    this.type = 'miner';
    this.name = name;
    this.color = color;
    this.miningTime = miningTime;
    this.minValue = minValue;
    this.mineNumber = mineNumber;
    this.maxPending = maxPending;
  }

  /**
   * Generates a block.
   * @function
   * @param {object} transactions - An array of transactions
   * @return {object}
   * @private
   * @see {@link Block}
   */
  generate(transactions) {
    const block = new Block(
      Hash.generateId(),
      'block',
      new Date(),
      this.id,
      '',
      -1,
      this.color,
      transactions
    );

    return block;
  }

  /**
   * Mines a block.
   * @function
   * @param {object} transactions - An array of transactions
   * @private
   */
  mine(transactions) {
    let count = 0;
    let timer = setInterval(() => {
      count += 1;
      Watchdog.getInstance().onDataChange('update mining progress', {
        nodeId: this.id,
        progress: count,
      });
      if (count >= this.miningTime) {
        // finish mining
        Watchdog.getInstance().onDataChange('update mining progress', {
          nodeId: this.id,
          progress: 0,
        });
        const block = this.generate(transactions);
        this.receiveBlock(block);
        clearInterval(timer);
      }
    }, 1000);
  }

  /**
   * Receive a transaction.
   * @function
   * @param {object} transaction
   * @private
   */
  receiveTransaction(transaction) {
    // copy transaction
    const newTransaction = new Transaction(
      transaction.id,
      'transaction',
      transaction.timestamp,
      transaction.message,
      transaction.reward,
      transaction.privilege
    );
    this.transactionPool.push(newTransaction);

    let transactions = []; // contains the candidate transactions for mining

    if (this.transactionPool.length >= this.maxPending) {
      // TODO: maximum number of transactions
    } else if (this.transactionPool.length >= this.mineNumber) {
      // select candidate transactions
      for (let i = this.transactionPool.length - 1; i >= 0; i--) {
        const pendingTransaction = this.transactionPool[i];
        const value = pendingTransaction.reward + pendingTransaction.privilege;
        if (value >= this.minValue) {
          transactions.push(pendingTransaction);
          this.transactionPool.splice(i, 1);
        } else {
          pendingTransaction.privilege += 1;
        }

        if (transactions.length >= this.mineNumber) {
          this.mine(transactions);
          break;
        }
      }
    }

    // push back the candidate transactions because the node does not mine
    if (transactions.length < this.mineNumber) {
      for (let i = 0; i < transactions.length; i++) {
        this.transactionPool.push(transactions[i]);
      }
    }
    Watchdog.getInstance().onDataChange('update transaction pool', {
      nodeId: this.id,
      length: this.transactionPool.length,
    });
  }
}

module.exports = Miner;
