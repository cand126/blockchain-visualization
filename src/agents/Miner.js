var Node = require('./Node');
var Block = require('../types/Block');
var Hash = require('../helper/Hash');

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
  generate() {
    const block = new Block(
      Hash.generateId(),
      'block',
      new Date(),
      this.id,
      '',
      '', -1,
      this.color, []
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
    // const block = this.generate();
    // setTimeout(() => {
    //   this.addBlock(block);
    //   this.publish(block, 0);
    // }, delay * 1000);
    console.log('mining');
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

      for (let i = 0; i < this.transactionPool.length; i++) {
        if (this.transactionPool[i].reward + this.transactionPool[i].privilege >= this.minValue) {
          transactions.push(this.transactionPool[i]);
        } else {
          this.transactionPool[i].privilege += 1;
        }

        if (transactions.length >= this.mineNumber) {
          this.mine(transactions);
          break;
        }
      }
    }
    this.watchdog.onTransactionChange(this, transaction);
  }
}

module.exports = Miner;