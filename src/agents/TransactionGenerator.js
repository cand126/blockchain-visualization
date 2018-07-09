const AbstractNode = require('./AbstractNode');
const Transaction = require('../types/Transaction');
const Hash = require('../helper/Hash');

class TransactionGenerator extends AbstractNode {
  constructor(id) {
    super(id);
    this.type = 'generator';
  }

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

  publish(transaction) {
    this.neighbors.forEach((neighbor) => {
      setTimeout(() => {
        this.send(neighbor.id, transaction);
      }, neighbor.delay * 1000);
    });
  }
}

module.exports = TransactionGenerator;
