import { TransactionGenerator } from "./agents/TransactionGenerator";
import { FastMiner } from "./agents/FastMiner";

var transactionGenerator: any = new TransactionGenerator("transactionGenerator");
var miner1: any = new FastMiner("miner1");
var miner2: any = new FastMiner("miner2");

transactionGenerator.publish("miner1", 1000);
transactionGenerator.publish("miner2", 2000);
transactionGenerator.publish("miner2", 3000);