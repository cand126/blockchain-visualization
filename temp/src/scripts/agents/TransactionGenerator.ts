import * as eve from "evejs";
import { Icontent } from "../types/Icontent";
import { Itransaction } from "../types/Itransaction";

/**
 * @class
 * @description this class is resposible for generating transactions
 * @extends eve.Agent extends Agent class from eve framework
 */
class TransactionGenerator extends eve.Agent {
    /**
     * @constructor
     * @param {string} id the id of the agent
     * @public
     */
    constructor(id: string) {
        super(id);
        this.connect(eve.system.transports.getAll()); // connect to all transports configured by the system
    }

    /**
     * @function
     * @description generate a transaction
     * @returns {Itransaction} return the transaction that is generated, @see {@link Itransaction}
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
     * @function
     * @description publish a transaction with a delay time
     * @param {string} to the id of the agents who will receive the transaction
     * @param {number} delay the number of time to delay
     * @public
     */
    publish(to: string, delay: number): void {
        let transaction: Itransaction = this.generate();
        setTimeout(() => {
            this.send(to, transaction);
        }, delay);
    }
}

export { TransactionGenerator };