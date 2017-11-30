import * as eve from "evejs";
import { Itransaction } from "../types/Itransaction";
import { Iblock } from "../types/Iblock";

/**
 * @class
 * @description this class is resposible for generating blocks
 * @extends eve.Agent extends Agent class from eve framework
 */
abstract class AbstractMiner extends eve.Agent {
    private pendingTransactions: Itransaction[] = [];
    private minedBlocks: Iblock[] = [];
    private latestBlock: Iblock;

    /**
     * @constructor
     * @param {string} id the id of the agent
     * @public
     */
    constructor(id: string) {
        super(id); // execute super constructor
        this.connect(eve.system.transports.getAll()); // connect to all transports configured by the system
    }

    /**
     * @function
     * @description generate a block
     * @returns {Iblock} return the block that is generated, @see {@link Iblock}
     * @private
     */
    private generate(): any {
        let block: Iblock = {
            id: "uuid",
            type: "transaction",
            timestamp: new Date(),
            miner: "uuid",
            previous: [],
            next: [],
            transactions: []
        };

        return block;
    }

    /**
     * @function
     * @description publish a block
     * @param {string} to the id of the agents who will receive the block
     * @public
     */
    publish(to: string): void {
        let block: Iblock = this.generate();
        this.send(to, block);
    }

    /**
     * @function
     * @description receive a transaction or a block
     * @param {string} from the id of the agents who sent the object
     * @param {any} object the id of the agents who will receive the block
     * @public
     */
    receive(from: string, object: any): void {
        if (object.type === "transaction") {
            this.pendingTransactions.push(object);
        }
    }

    /**
     * @function
     * @description get pending transactions
     * @returns {Itransaction[]} return an array of transactions, @see {@link Itransaction}
     * @public
     */
    getPendingTransactions(): Itransaction[] {
        return this.pendingTransactions;
    }

    /**
     * @function
     * @description get a block
     * @param {string} id the id of a block, or "latest" for the latest block
     * @returns {Iblock} return a block, @see {@link Iblock}
     * @public
     */
    getBlock(id: string): Iblock {
        if (id === "latest") {
            return this.latestBlock;
        } else {
            for (let block of this.minedBlocks) {
                if (block.id === id) {
                    return block;
                }
            }
        }
    }

    abstract stategy(): void;
}

export { AbstractMiner };