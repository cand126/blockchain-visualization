import TransactionGenerator from '../agents/TransactionGenerator';
import Miner from '../agents/Miner';
import Nonminer from '../agents/Nonminer';
import Hash from '../helper/Hash';

/**
 * @class this class is resposible for generating transactions
 * @extends Eve.Agent extends Agent class from eve framework
 */
class Simulator {
  /**
   * @constructor
   * @public
   */
  constructor() {
    this.nodeList = [];
    this.transactionGenerator = TransactionGenerator.getInstance();
  }

  /**
   * singleton
   */
  static getInstance() {
    if (!this.instance) {
      this.instance = new Simulator();
    }
    return this.instance;
  }

  /**
   * @public
   */
  addNode(node) {
    let newNode = null;

    if (node.type === 'miner') {
      newNode = new Miner(node.id, node.type, node.name, node.color, node.miningTime, node.minValue, node.mineNumber, node.maxPending);
    } else if (node.type === 'nonminer') {
      newNode = new Nonminer(node.id, node.type, node.name);
    }

    // this.transactionGenerator.addNeighbor(node.id, node.name, 0);
    this.transactionGenerator.addNeighbor(node.id, node.name, Math.floor(Math.random() * 5));

    this.nodeList.forEach((oldNode) => {
      oldNode.addNeighbor(newNode.id, newNode.name, 0);
      newNode.addNeighbor(oldNode.id, oldNode.name, 0);
    });

    this.nodeList.push(newNode);
    return newNode;
  }

  /**
   * @public
   */
  addDelays(transactionDelays, nodeDelays) {
    let transactionGenerator = TransactionGenerator.getInstance();

    transactionDelays.forEach((delay) => {
      transactionGenerator.addNeighbor(delay.nodeId, delay.time);
    });

    nodeDelays.forEach((delay) => {
      this.nodeList.forEach((node) => {
        if (node.id === delay.nodeId[0]) {
          node.addNeighbor(delay.nodeId[1], delay.time);
        } else if (node.id === delay.nodeId[1]) {
          node.addNeighbor(delay.nodeId[0], delay.time);
        }
      });
    });

    console.log('ddd');
    console.log(this.nodeList);
  }

  /**
   * @public
   */
  start() {
    this.nodeList.forEach((node) => {
      node.initBlockchain();
    });
    // test
    // this.minerList[1].neighbors.pop();
    // this.minerList[0].mine(0);
    // this.minerList[1].mine(3);
    // this.minerList[2].mine(6);
    // this.minerList[0].mine(9);
  }
}

export default Simulator;
