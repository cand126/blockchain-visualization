class Transaction {
  constructor(
    id,
    type,
    timestamp,
    reward,
    privilege
  ) {
    this.id = id;
    this.type = type;
    this.timestamp = timestamp;
    this.reward = reward;
    this.privilege = privilege;
  }
}

module.exports = Transaction;
