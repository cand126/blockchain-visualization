import { Itransaction } from "./Itransaction";

interface Iblock {
    readonly id: string;
    readonly type: string;
    readonly timestamp: Date;
    readonly miner: string;
    readonly transactions: Itransaction[];
}

export { Iblock };