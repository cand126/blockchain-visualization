import { AbstractMiner } from './abstract-miner';

export class FastMiner extends AbstractMiner {
    constructor(id: string, visualizer: any) {
        super(id, visualizer);
    }

    stategy(): void {
        if (this.getPendingTransactions.length >= 2) {
            console.log('mining');
        }
    }
}
