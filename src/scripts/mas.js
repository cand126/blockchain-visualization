var Generator = require('./agents/TransactionGenerator');
var Miner = require('./agents/Miner');

var transactionGenerator = new Generator('transactionGenerator');
var miner1 = new Miner('miner1');
var miner2 = new Miner('miner2');

transactionGenerator.publish('miner1');
transactionGenerator.publish('miner2');