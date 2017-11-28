import * as eve from "evejs";
import { Icontent } from "../data/Icontent";
import { Itransaction } from "../data/Itransaction";

class TransactionGenerator extends eve.Agent {
    constructor(id: string) {
        super(id); // execute super constructor
        this.connect(eve.system.transports.getAll()); // connect to all transports configured by the system
    }

    /**
     * @description generate a transaction
     * @return {Itransaction} return the transaction that is generated
     * @private
     */
    private generate(): any {
        let content: Icontent = {
            from: "bob",
            to: "alice",
            message: "hello"
        };

        let transaction: Itransaction = {
            id: "uuid",
            type: "transaction",
            timestamp: new Date(),
            content: content
        };

        return transaction;
    }

    /**
     * @description publish a transaction
     * @param {string} to the id of the agents who will receive the transaction
     * @public
     */
    publish(to: string): void {
        let transaction: any = this.generate();
        this.send(to, transaction);
    }
}

export { TransactionGenerator };