import { Visualizer } from '../visualizer/visualizer';

export class Watchdog {
  static onTransactionChange(id: string, transaction: any) {
    Visualizer.appendTransaction(id, transaction);
  }
}
