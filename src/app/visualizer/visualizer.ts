export class Visualizer {
  appendTransaction(id: string, transaction: any) {
    const node = document.createElement('div');
    node.innerText = JSON.stringify(transaction);
    document.getElementById(id).appendChild(node);
  }
}
