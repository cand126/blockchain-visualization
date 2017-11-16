var eve = require('evejs');

function NodeAgent(id) {
    // execute super constructor
    eve.Agent.call(this, id);

    // connect to all transports configured by the system
    this.connect(eve.system.transports.getAll());
}

// extend the eve.Agent prototype
NodeAgent.prototype = Object.create(eve.Agent.prototype);
NodeAgent.prototype.constructor = NodeAgent;

NodeAgent.prototype.sayHello = function (to) {
    this.send(to, 'Hello ' + to + '!');
};

NodeAgent.prototype.receive = function (from, message) {
    console.log(from + ' said: ' + JSON.stringify(message));

    if (message.indexOf('Hello') === 0) {
        // reply to the greeting
        this.send(from, 'Hi ' + from + ', nice to meet you!');
    }
};

module.exports = NodeAgent;