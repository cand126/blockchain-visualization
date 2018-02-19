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
  onTransactionChange(action, data) {
    let appSocket = require('../appSocket');
    appSocket.updateVisualization(action, data);
  }

  /**
   * @public
   */
  onBlockChange(action, data) {
    let appSocket = require('../appSocket');
    appSocket.updateVisualization(action, data);
  }

  /**
   * @public
   */
  onMiningChange(action, data) {
    let appSocket = require('../appSocket');
    appSocket.updateVisualization(action, data);
  }
}

module.exports = Watchdog;
