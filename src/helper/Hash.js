/**
 * Simulate hash functions.
 * @class
 * @public
 */
class Hash {
  /**
   * Genarate a hash value.
   * @function generateId
   * @static
   * @return {string} A hash value with length 8.
   */
  static generateId() {
    return Math
      .floor((1 + Math.random()) * 0x100000000)
      .toString(16)
      .substring(1);
  }

  /**
   * Genarate a hash value which is all zero.
   * @function generateNull
   * @static
   * @return {string} A hash value with length 8.
   */
  static generateNull() {
    return '00000000';
  }
}

module.exports = Hash;
