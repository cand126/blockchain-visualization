import { Icontent } from "./Icontent";

interface Itransaction {
    readonly id: string;
    readonly type: string;
    readonly timestamp: Date;
    readonly content: Icontent;
}

export { Itransaction };