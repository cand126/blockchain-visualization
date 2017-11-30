import { AbstractMiner } from "./AbstractMiner";

class FastMiner extends AbstractMiner {
    constructor(id: string) {
        super(id);
    }

    stategy(): void {
        if (this.getPendingTransactions.length >= 2) {
            console.log("mine");
        }
    }
}

export { FastMiner };