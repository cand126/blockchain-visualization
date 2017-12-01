import { Itransaction } from './itransaction';

/**
 * @interface Iblock a data type for blocks
 * @property {string} id the id of the block
 * @property {string} type is always "block", to indicate this object is a block
 * @property {Date} timestamp the timestamp of the block, should be the time when the block is created
 * @property {string} miner the id of the agent who mined the block
 * @property {string[]} previous the array of id of the blocks that are the previous blocks
 * @property {string[]} next the array of id of the blocks that are the next blocks
 * @property {Itransaction[]} transactions the array of the transactions which is contained in the block, @see {@link Itransaction}
 * @example
 * {
 *     id: ,
 *     type: "block",
 *     timestamp: ,
 *     miner: ,
 *     previous: ,
 *     transactions: [
 *         transaction1,
 *         transaction2,
 *         transaction3,
 *         ...
 *     ]
 * }
 */
export interface Iblock {
  readonly id: string;
  readonly type: string;
  readonly timestamp: Date;
  readonly miner: string;
  previous: string[];
  next: string[];
  readonly transactions: Itransaction[];
}
