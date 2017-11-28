var eve = require('evejs');

function TransactionGenerator(id) {
    // execute super constructor
    eve.Agent.call(this, id);

    // connect to all transports configured by the system
    this.connect(eve.system.transports.getAll());
}

// extend the eve.Agent prototype
TransactionGenerator.prototype = Object.create(eve.Agent.prototype);
TransactionGenerator.prototype.constructor = TransactionGenerator;

// generate a transaction
TransactionGenerator.prototype.generate = function () {
    let transaction = {};
    transaction.id = '1';
    transaction.timestamp = 'now';
    transaction.content = 'hi';

    return transaction;
};

// publish a transaction
TransactionGenerator.prototype.publish = function (to) {
    let transaction = this.generate();
    console.log(transaction)
    this.send(to, transaction);
};

TransactionGenerator.prototype.receive = function (from, message) {
    // console.log(from + ' said: ' + JSON.stringify(message));
};

module.exports = TransactionGenerator;