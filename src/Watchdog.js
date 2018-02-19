/**
 * @public
 */
class Watchdog {
  constructor() {
    this.visualizerList = [];
  }

  /**
   * singleton
   */
  static getInstance() {
    if (!this.instance) {
      this.instance = new Watchdog();
    }
    return this.instance;
  }

  /**
   * @public
   */
  addVisualizer(visualizer) {
    this.visualizerList.push(visualizer);
  }

  /**
   * @public
   */
  onTransactionChange(node, transaction) {
    this.visualizerList.forEach((visualizer) => {
      if (visualizer.nodeId === node.id) {
        if (node.type === 'miner') {
          visualizer.updateTransactionPool(node.transactionPool.length);
        }
      }
    });
  }

  /**
   * @public
   */
  onBlockChange(node, block) {
    this.visualizerList.forEach((visualizer) => {
      if (visualizer.nodeId === node.id) {
        visualizer.addBlock(block);
      }
    });
  }

  onNodeChange(action, state) {

  }
}

module.exports = Watchdog;