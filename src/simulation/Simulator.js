import TransactionGenerator from '../agents/TransactionGenerator';
import Miner from '../agents/Miner';
import Node from '../agents/Node';
import Hash from '../helper/Hash';

class Simulator {
  constructor() {
    this.nodeList = [];
    this.transactionGenerator = TransactionGenerator.getInstance(Hash.generateId());
  }

  // singleton
  static getInstance() {
    if (!this.instance) {
      this.instance = new Simulator();
    }
    return this.instance;
  }

  addNodes(nodes, delays) {
    nodes.forEach((node) => {
      if (node.type === 'miner') {
        let miner = new Miner(node.id, node.color);
        this.nodeList.push(miner);
      } else if (node.type) {
        let common = new Node(node.id);
        this.nodeList.push(common);
      }
    });

    delays.forEach((delay) => {
      this.nodeList.forEach((node) => {
        if (node.id === delay.node[0]) {
          node.addNeighbor(delay.node[1], delay.time);
        } else if (node.id === delay.node[1]) {
          node.addNeighbor(delay.node[0], delay.time);
        }
      });
    });
  }

  // addMiner(miner) {
  //   this.minerList.push(miner);

  //   // let miners know each other
  //   this.minerList.forEach((miner) => {
  //     this.minerList.forEach((otherMiner) => {
  //       if (miner.id !== otherMiner.id && miner.neighbors.indexOf(otherMiner.id) === -1) {
  //         miner.neighbors.push(otherMiner.id);
  //       }
  //     });
  //   });
  // }

  start() {
    // test
    this.obj[0].fuck();
    this.minerList[1].neighbors.pop();
    this.minerList[0].mine(0);
    this.minerList[1].mine(3);
    this.minerList[2].mine(6);
    this.minerList[0].mine(9);
  }
}

export default Simulator;
