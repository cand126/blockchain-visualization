import Node from './Node';

/**
 * @class this class is resposible for mining
 * @extends Eve.Agent extends Agent class from eve framework
 */
class Nonminer extends Node {
  /**
   * @public
   */
  constructor(id, type, name) {
    super(id);
    this.type = type;
    this.name = name;
  }
}

export default Nonminer;
