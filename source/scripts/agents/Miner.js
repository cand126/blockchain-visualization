var eve = require('evejs');

function Miner(id) {
    // execute super constructor
    eve.Agent.call(this, id);

    // connect to all transports configured by the system
    this.connect(eve.system.transports.getAll());
}

// extend the eve.Agent prototype
Miner.prototype = Object.create(eve.Agent.prototype);
Miner.prototype.constructor = Miner;

// publish a block
Miner.prototype.publish = function (to) {
    // this.send(to, 'Hello ' + to + '!');
};

Miner.prototype.receive = function (from, message) {
    console.log(from + ' said: ' + JSON.stringify(message));
};

module.exports = Miner;