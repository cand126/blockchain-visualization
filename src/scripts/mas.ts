import { TransactionGenerator } from "./agents/TransactionGenerator";
import { Miner } from "./agents/Miner";

var transactionGenerator: any = new TransactionGenerator("transactionGenerator");
var miner1: any = new Miner("miner1");
var miner2: any = new Miner("miner2");

transactionGenerator.publish("miner1");
transactionGenerator.publish("miner2");
transactionGenerator.publish("miner2");