export class Visualizer {
  private minerId;
  private blockchain: any;

  constructor(minerId: string) {
    this.minerId = minerId;
  }

  initBlockchain() {
    const node = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    node.setAttributeNS(null, 'height', '10');
    node.setAttributeNS(null, 'width', '10');
    node.setAttributeNS(null, 'fill', 'blue');
    const blockchains = document.getElementsByClassName('blockchain');
    console.log(blockchains.length);
    for (let i = 0; i < blockchains.length; i++) {
      const blockchain: any = blockchains[i];
      console.log(blockchain);
      if (blockchain.getAttribute('data-miner-id') === this.minerId) {
        blockchain.appendChild(node);
      }
    }
  }

  appendTransaction(id: string, transaction: any) {
    const node = document.createElement('div');
    node.innerText = JSON.stringify(transaction);
    const transactionPools = document.getElementsByClassName('transaction-pool');
    for (let i = 0; i < transactionPools.length; i++) {
      const transactionPool: any = transactionPools[i];
      if (transactionPool.getAttribute('data-miner-id') === id) {
        transactionPool.appendChild(node);
      }
    }
  }

  appendBlock(id: string, block: any) {
    const node = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  }
}
