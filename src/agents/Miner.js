import Node from './Node';
import Block from '../types/Block';
import Hash from '../helper/Hash';

/**
 * @class this class is resposible for mining
 * @extends Eve.Agent extends Agent class from eve framework
 */
class Miner extends Node {
  minValue;
  maxPendingTransaction;
  numberOfTransaction;

  constructor(id, color) {
    super(id);
    this.color = color;
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

  setMiningStrategy(minValue, maxPendingTransaction, numberOfTransaction) {
    this.minValue = minValue;
    this.maxPendingTransaction = maxPendingTransaction;
    this.numberOfTransaction = numberOfTransaction;
  }

  mine(delay) {
    const block = this.generate();
    setTimeout(() => {
      this.addBlock(block);
      this.publish(block, 0);
    }, delay * 1000);
  }

  consensusProtocol(from) {
    this.send(from, 'blockchain');
  }
}

export default Miner;
