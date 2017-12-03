/**
 * @interface Icontent a data type for the content of a transaction
 * @property {string} from the id of the agent who created the content
 * @property {string} to the id of the agent who will receive the content
 * @property {string} message a message can be any content
 * @example
 * {
 *     from: ,
 *     to: ,
 *     message:
 * }
 */
export interface Icontent {
  readonly from: string;
  readonly to: string;
  readonly message: string;
}
