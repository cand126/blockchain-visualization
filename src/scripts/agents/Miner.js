var eve = require('evejs');

class Miner extends eve.Agent {
    constructor(id) {
        super(id); // execute super constructor
        this.connect(eve.system.transports.getAll()); // connect to all transports configured by the system
    }

    publish(to) {
        // this.send(to, 'Hello ' + to + '!');
    }

    receive(from, message) {
        console.log(from + ' said: ' + JSON.stringify(message));
    }
}

module.exports = Miner;