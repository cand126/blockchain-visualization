/**
 * @public
 */
class Hash {
  /**
   * @public
   */
  static generateId() {
    return Math.floor((1 + Math.random()) * 0x100000000).toString(16).substring(1);
  }

  /**
   * @public
   */
  static generateNull() {
    return '00000000';
  }
}

module.exports = Hash;