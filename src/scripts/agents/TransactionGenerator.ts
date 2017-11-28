import * as eve from "evejs";

class TransactionGenerator extends eve.Agent {
    constructor(id: string) {
        super(id); // execute super constructor
        this.connect(eve.system.transports.getAll()); // connect to all transports configured by the system
    }

    generate(): any {
        let transaction: any = {};
        transaction.id = "1";
        transaction.timestamp = "now";
        transaction.content = "hi";

        return transaction;
    }

    publish(to: string): void {
        let transaction: any = this.generate();
        console.log(transaction)
        this.send(to, transaction);
    }
}

export { TransactionGenerator };