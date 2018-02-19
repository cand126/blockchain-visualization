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
  // addVisualizer(visualizer) {
  //   this.visualizerList.push(visualizer);
  // }

  /**
   * @public
   */
  onTransactionChange(action, data) {
    let appSocket = require('../appSocket');
    appSocket.updateVisualization(action, data);
  }

  /**
   * @public
   */
  onBlockChange(node, block) {
    // this.visualizerList.forEach((visualizer) => {
    //   if (visualizer.nodeId === node.id) {
    //     visualizer.addBlock(block);
    //   }
    // });
  }

  onMiningChange(action, data) {
    let appSocket = require('../appSocket');
    appSocket.updateVisualization(action, data);
  }
}

module.exports = Watchdog;
