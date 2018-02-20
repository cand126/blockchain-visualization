/**
 * Responible for monitoring the blockchain system.
 * @class
 * @public
 */
class Watchdog {
  /**
   * Singleton pattern.
   * @function
   * @static
   * @return {object} The instance of the class.
   */
  static getInstance() {
    if (!this.instance) {
      this.instance = new Watchdog();
    }
    return this.instance;
  }

  /**
   * Triggered when data in the blockchain system is changed.
   * @function
   * @public
   * @param {string} action - Instructions.
   * @param {object} data   - Changed data.
   */
  onDataChange(action, data) {
    // Send changed data to the visualizer.
    let appSocket = require('../appSocket');
    appSocket.updateVisualization(action, data);
  }
}

module.exports = Watchdog;
