var Generator = require('./agents/TransactionGenerator');
var Miner = require('./agents/Miner');

// create two agents
var transactionGenerator = new Generator('transactionGenerator');
var miner1 = new Miner('miner1');
var miner2 = new Miner('miner2');

// send a message to agent1
transactionGenerator.publish('miner1');
transactionGenerator.publish('miner2');