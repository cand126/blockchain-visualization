const AbstractNode = require('./AbstractNode');

/**
 * Represents a nonminer.
 * @class
 * @public
 * @extends AbstractNode
 */
class Nonminer extends AbstractNode {
  /**
   * @constructor
   * @public
   * @param {string} id
   * @param {string} name
   */
  constructor(id, name) {
    super(id);
    this.type = 'nonminer';
    this.name = name;
  }
}

module.exports = Nonminer;
