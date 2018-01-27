import TransactionGenerator from '../agents/TransactionGenerator';
import Miner from '../agents/Miner';
import Hash from '../helper/Hash';

class Simulator {
  constructor() {
    this.minerList = [];
    this.transactionGenerator = TransactionGenerator.getInstance();
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
        if (miner.id !== otherMiner.id && miner.minerList.indexOf(otherMiner.id) === -1) {
          miner.minerList.push(otherMiner.id);
        }
      });
    });
  }

  start() {
    // test
    this.minerList[0].publish(this.minerList[1].id, 0);
  }
}

export default Simulator;
