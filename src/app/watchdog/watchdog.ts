import { Visualizer } from '../visualizer/visualizer';

export class Watchdog {
  static onTransactionChange(id: string, transaction: any, visualizer: any) {
    visualizer.appendTransaction(id, transaction);
  }

  static onBlockChange(id: string, block: any, visualizer: any) {
    visualizer.appendBlock(id, block);
  }
}
