const AbstractNode = require('./AbstractNode');

class Nonminer extends AbstractNode {
  constructor(id, name) {
    super(id);
    this.type = 'nonminer';
    this.name = name;
  }
}

module.exports = Nonminer;
