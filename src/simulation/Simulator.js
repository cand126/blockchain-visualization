import TransactionGenerator from '../agents/TransactionGenerator';
import Miner from '../agents/Miner';
import Node from '../agents/Node';
import Hash from '../helper/Hash';

class Simulator {
  constructor() {
    this.nodeList = [];
    this.transactionGenerator = TransactionGenerator.getInstance();
  }

  // singleton
  static getInstance() {
    if (!this.instance) {
      this.instance = new Simulator();
    }
    return this.instance;
  }

  addNode(node) {
    let newNode = null;

    if (node.type === 'miner') {
      newNode = new Miner(node.id, node.type, node.name, node.color, node.miningTime, node.minValue, node.mineNumber, node.maxPending);
    } else if (node.type) {
      newNode = new Node(node.id, node.type, node.name);
    }

    this.transactionGenerator.addNeighbor(node.id, node.name, 0);

    this.nodeList.forEach((oldNode) => {
      oldNode.addNeighbor(newNode.id, newNode.name, 0);
      newNode.addNeighbor(oldNode.id, oldNode.name, 0);
    });

    this.nodeList.push(newNode);
    return newNode;
  }

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

  start() {
    // test
    this.minerList[1].neighbors.pop();
    this.minerList[0].mine(0);
    this.minerList[1].mine(3);
    this.minerList[2].mine(6);
    this.minerList[0].mine(9);
  }
}

export default Simulator;
