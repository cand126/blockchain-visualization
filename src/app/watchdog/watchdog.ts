import { Visualizer } from '../visualizer/visualizer';

export class Watchdog {
  private minerList: any[] = [];
  private visualizerList: any[] = [];

  /**
   * addMiner
   */
  public addMiner(id: string, name: string, color: string) {
    this.minerList.push({
      id: id,
      name: name,
      color: color
    });
  }

  public addVisualizer(minerId: string, visualizer: any) {
    this.visualizerList.push({
      minerId: minerId,
      visualizer: visualizer
    });
  }

  public onTransactionChange(id: string, transaction: any, visualizer: any) {
    visualizer.appendTransaction(id, transaction);
  }

  public onBlockChange(id: string, block: any, visualizer: any) {
    visualizer.appendBlock(id, block);
  }
}
