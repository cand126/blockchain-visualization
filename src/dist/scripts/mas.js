"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TransactionGenerator_1 = require("./agents/TransactionGenerator");
var Miner_1 = require("./agents/Miner");
var transactionGenerator = new TransactionGenerator_1.TransactionGenerator("transactionGenerator");
var miner1 = new Miner_1.Miner("miner1");
var miner2 = new Miner_1.Miner("miner2");
transactionGenerator.publish("miner1");
transactionGenerator.publish("miner2");
//# sourceMappingURL=mas.js.map