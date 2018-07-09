class Block {
  constructor(
    id,
    type,
    timestamp,
    miner,
    previous,
    layer,
    color,
    transactions
  ) {
    this.id = id;
    this.type = type;
    this.timestamp = timestamp;
    this.miner = miner;
    this.previous = previous;
    this.layer = layer;
    this.color = color;
    this.transactions = transactions;
  }
}

module.exports = Block;
