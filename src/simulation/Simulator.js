import TransactionGenerator from '../agents/TransactionGenerator';
import Miner from '../agents/Miner';
import Hash from '../helper/Hash';

class Simulator {
  constructor() {
    this.minerList = [];
    this.transactionGenerator = TransactionGenerator.getInstance();
    this.obj = [];
  }

  // singleton
  static getInstance() {
    if (!this.instance) {
      this.instance = new Simulator();
    }
    return this.instance;
  }

  addMiner(miner) {
    this.minerList.push(miner);

    // let miners know each other
    this.minerList.forEach((miner) => {
      this.minerList.forEach((otherMiner) => {
        if (miner.id !== otherMiner.id && miner.neighbors.indexOf(otherMiner.id) === -1) {
          miner.neighbors.push(otherMiner.id);
        }
      });
    });
  }

  start() {
    // test
    this.obj[0].fuck();
    this.minerList[1].neighbors.pop();
    this.minerList[0].mine(0);
    this.minerList[1].mine(3);
    this.minerList[2].mine(6);
    this.minerList[0].mine(9);
  }

  add(obj) {
    this.obj.push(obj);
  }
}

export default Simulator;
