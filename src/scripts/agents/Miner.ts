import * as eve from "evejs";

class Miner extends eve.Agent {
    constructor(id: string) {
        super(id); // execute super constructor
        this.connect(eve.system.transports.getAll()); // connect to all transports configured by the system
    }

    // publish a block
    publish(to: string): void {
        // this.send(to, 'Hello ' + to + '!');
    }

    receive(from: string, message: any): void {
        console.log(from + " said: " + JSON.stringify(message));
    }
}

export { Miner };