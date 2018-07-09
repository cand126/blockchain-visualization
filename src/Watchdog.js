class Watchdog {
  static getInstance() {
    if (!this.instance) {
      this.instance = new Watchdog();
    }
    return this.instance;
  }

  onDataChange(action, data) {
    // Send changed data to the visualizer.
    let appSocket = require('../appSocket');
    appSocket.updateVisualization(action, data);
  }
}

module.exports = Watchdog;
