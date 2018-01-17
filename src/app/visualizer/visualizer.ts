export class Visualizer {
  static appendTransaction(id: string, transaction: any) {
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
}
