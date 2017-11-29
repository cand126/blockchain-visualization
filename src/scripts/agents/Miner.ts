import * as eve from "evejs";

/**
 * @class
 * @description this class is resposible for generating blocks
 * @extends eve.Agent extends Agent class from eve framework
 */
class Miner extends eve.Agent {
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
     * @description publish a block
     * @param {string} to the id of the agents who will receive the block
     * @public
     */
    publish(to: string): void {
        // this.send(to, 'Hello ' + to + '!');
    }

    /**
     * @function
     * @description receive a transaction or a block
     * @param {string} from the id of the agents who sent the object
     * @param {any} object the id of the agents who will receive the block
     * @public
     */
    receive(from: string, object: any): void {
        console.log(from + " said: " + JSON.stringify(object));
    }
}

export { Miner };