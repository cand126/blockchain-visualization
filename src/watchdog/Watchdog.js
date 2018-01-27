class Watchdog {
  constructor() {
    this.visualizerList = [];
  }

  // singleton
  static getInstance() {
    if (!this.instance) {
      this.instance = new Watchdog();
    }
    return this.instance;
  }

  addLogger(logger) {
    this.logger = logger;
  }

  addVisualizer(visualizer) {
    this.visualizerList.push(visualizer);
  }

  onTransactionChange(miner, transaction) {
    this.logger.addlog(miner.id, transaction);
  }

  onBlockChange(miner, block) {
    this.logger.addlog(miner.id, block);
    this.visualizerList.forEach((visualizer) => {
      if (visualizer.minerId === miner.id) {
        visualizer.addBlock(block);
      }
    });
  }
}

export default Watchdog;
