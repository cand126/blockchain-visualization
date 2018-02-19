let Node = require('./Node');
let Block = require('../types/Block');
let Hash = require('../helper/Hash');

/**
 * @class this class is resposible for mining
 * @extends Eve.Agent extends Agent class from eve framework
 */
class Miner extends Node {
  /**
   * @public
   */
  constructor(id, type, name, color, miningTime, minValue, mineNumber, maxPending) {
    super(id);
    this.type = type;
    this.name = name;
    this.color = color;
    this.miningTime = miningTime;
    this.minValue = minValue;
    this.mineNumber = mineNumber;
    this.maxPending = maxPending;
  }

  /**
   * @function generate generate a block
   * @returns {Iblock} return the block that is generated, @see {@link Iblock}
   * @private
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
   * @public
   */
  setMiningStrategy(minValue, maxPendingTransaction, numberOfTransaction) {
    this.minValue = minValue;
    this.maxPendingTransaction = maxPendingTransaction;
    this.numberOfTransaction = numberOfTransaction;
  }

  /**
   * @public
   */
  mine(transactions) {
    let count = 0;
    let timer = setInterval(() => {
      count += 1;
      this.watchdog.onMiningChange('update mining progress', {
        nodeId: this.id,
        progress: count,
      });
      if (count >= this.miningTime) {
        this.watchdog.onMiningChange('update mining progress', {
          nodeId: this.id,
          progress: 0,
        });
        const block = this.generate(transactions);
        this.addBlock(block);
        clearInterval(timer);
      }
    }, 1000);
  }

  /**
   * @public
   */
  consensusProtocol(from) {
    this.send(from, 'blockchain');
  }

  /**
   * @public
   */
  receiveTransaction(transaction) {
    this.transactionPool.push(transaction);
    if (this.transactionPool.length >= this.maxPending) {
      // TODO: maximum number of transactions
    } else if (this.transactionPool.length >= this.mineNumber) {
      let transactions = [];

      for (let i = this.transactionPool.length - 1; i >= 0; i--) {
        if ((this.transactionPool[i].reward + this.transactionPool[i].privilege) >= this.minValue) {
          transactions.push(this.transactionPool[i]);
          this.transactionPool.splice(i, 1);
        } else {
          this.transactionPool[i].privilege += 1;
        }

        if (transactions.length >= this.mineNumber) {
          this.mine(transactions);
          break;
        }
      }
    }
    this.watchdog.onTransactionChange('update transaction pool', {
      nodeId: this.id,
      length: this.transactionPool.length,
    });
  }
}

module.exports = Miner;
