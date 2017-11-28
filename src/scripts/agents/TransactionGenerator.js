var eve = require('evejs');

class TransactionGenerator extends eve.Agent {
    constructor(id) {
        super(id); // execute super constructor
        this.connect(eve.system.transports.getAll()); // connect to all transports configured by the system
    }

    generate() {
        let transaction = {};
        transaction.id = '1';
        transaction.timestamp = 'now';
        transaction.content = 'hi';

        return transaction;
    };

    publish(to) {
        let transaction = this.generate();
        console.log(transaction)
        this.send(to, transaction);
    };
}

module.exports = TransactionGenerator;