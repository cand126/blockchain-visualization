var NodeAgent = require('./NodeAgent');

// create two agents
var agent1 = new NodeAgent('agent1');
var agent2 = new NodeAgent('agent2');

// send a message to agent1
agent2.send('agent1', 'Hello agent1!');