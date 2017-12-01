import { Icontent } from './Icontent';

/**
 * @interface Itransaction a data type for transactions
 * @property {string} id the id of the transaction
 * @property {string} type is always "transaction", to indicate this object is a transaction
 * @property {Date} timestamp the timestamp of the transaction, should be the time when the trasaction is created
 * @property {Icontent} content the content of the transaction, @see {@link Icontent}
 * @example
 * {
 *     id: ,
 *     type: "transaction",
 *     timestamp: ,
 *     content: {
 *         from: ,
 *         to: ,
 *         message:
 *     }
 * }
 */
export interface Itransaction {
  readonly id: string;
  readonly type: string;
  readonly timestamp: Date;
  readonly content: Icontent;
}
