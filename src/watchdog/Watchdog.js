class Watchdog {
  instance;

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

  onTransactionChange(id, transaction) {
    this.logger.addlog(id, transaction);
  }

  onBlockChange(id, block) {
    this.logger.addlog(id, block);
  }
}

export default Watchdog;
