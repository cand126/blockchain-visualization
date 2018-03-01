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
   * @param {number} maxPending - The number of maximum pending transactions in the transaction pool.
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
    this.totalReward = 0;
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

    // sort the transaction pool
    this.transactionPool.sort((transaction1, transaction2) => {
      let value1 = transaction1.reward + transaction1.privilege;
      let value2 = transaction2.reward + transaction2.privilege;
      return value1 - value2;
    });

    if (this.transactionPool.length >= this.maxPending) {
      // select transactions with higher values
      for (let i = this.transactionPool.length - 1; i >= 0; i--) {
        const pendingTransaction = this.transactionPool[i];

        if (transactions.length < this.mineNumber) {
          transactions.push(pendingTransaction);
          this.transactionPool.splice(i, 1);
        } else {
          pendingTransaction.privilege += 1;
        }
      }
    } else if (this.transactionPool.length >= this.mineNumber) {
      // select candidate transactions
      for (let i = this.transactionPool.length - 1; i >= 0; i--) {
        const pendingTransaction = this.transactionPool[i];
        const value = pendingTransaction.reward + pendingTransaction.privilege;

        if (value >= this.minValue && transactions.length < this.mineNumber) {
          transactions.push(pendingTransaction);
          this.transactionPool.splice(i, 1);
        } else {
          pendingTransaction.privilege += 1;
        }
      }
    }

    if (transactions.length >= this.mineNumber) {
      this.mine(transactions);
    } else {
      // push back the candidate transactions because the node does not mine
      for (let i = 0; i < transactions.length; i++) {
        this.transactionPool.push(transactions[i]);
      }
    }

    Watchdog.getInstance().onDataChange('update transaction pool', {
      nodeId: this.id,
      length: this.transactionPool.length,
    });
  }

  calculateReward() {
    let currentBlock = this.currentBlock;
    this.totalReward = 0;

    while (currentBlock.id !== Hash.generateNull()) {
      if (currentBlock.miner === this.id) {
        currentBlock.transactions.forEach((transaction) => {
          this.totalReward += transaction.reward;
        });
      }
      currentBlock = this.blockchain.find((block) => block.id === currentBlock.previous);
    }

    Watchdog.getInstance().onDataChange('update reward', {
      nodeId: this.id,
      reward: this.totalReward,
    });
  }
}

module.exports = Miner;
