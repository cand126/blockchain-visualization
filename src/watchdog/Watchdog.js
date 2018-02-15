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
  addLogger(logger) {
    this.logger = logger;
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
  onTransactionChange(miner, transaction) {
    this.logger.addlog(miner.id, transaction);
  }

  /**
   * @public
   */
  onBlockChange(node, block) {
    this.logger.addlog(node.id, block);
    this.visualizerList.forEach((visualizer) => {
      if (visualizer.nodeId === node.id) {
        visualizer.addBlock(block);
      }
    });
  }
}

export default Watchdog;
