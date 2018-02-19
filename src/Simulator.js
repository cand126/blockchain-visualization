const TransactionGenerator = require('./agents/TransactionGenerator');
const Miner = require('./agents/Miner');
const Nonminer = require('./agents/Nonminer');
const Hash = require('./helper/Hash');

/**
 * @class this class is resposible for generating transactions
 * @extends Eve.Agent extends Agent class from eve framework
 */
class Simulator {
  /**
   * @constructor
   * @public
   */
  constructor() {
    this.nodeList = [];

    // test
    this.addNode({
      id: Hash.generateId(),
      type: 'miner',
      color: '#e53935',
      name: 'Alice',
      miningTime: Math.floor(Math.random() * 5) + 5,
      minValue: 3,
      mineNumber: 2,
      maxPending: 10,
    });
    this.addNode({
      id: Hash.generateId(),
      type: 'miner',
      color: '#03a9f4',
      name: 'Bob',
      miningTime: Math.floor(Math.random() * 5) + 5,
      minValue: 2,
      mineNumber: 2,
      maxPending: 10,
    });
    this.addNode({
      id: Hash.generateId(),
      type: 'miner',
      color: '#4caf50',
      name: 'Charlie',
      miningTime: Math.floor(Math.random() * 5) + 5,
      minValue: 8,
      mineNumber: 2,
      maxPending: 10,
    });
    this.addNode({
      id: Hash.generateId(),
      type: 'nonminer',
      name: 'David',
      color: '#000000',
    });
    this.addNode({
      id: Hash.generateId(),
      type: 'nonminer',
      name: 'Eric',
      color: '#000000',
    });
  }

  /**
   * singleton
   */
  static getInstance() {
    if (!this.instance) {
      this.instance = new Simulator();
    }
    return this.instance;
  }

  /**
   * @public
   */
  addNode(nodeData) {
    let newNode = null;

    if (nodeData.type === 'miner') {
      newNode = new Miner(nodeData.id, nodeData.type, nodeData.name, nodeData.color, nodeData.miningTime, nodeData.minValue, nodeData.mineNumber, nodeData.maxPending);
    } else if (nodeData.type === 'nonminer') {
      newNode = new Nonminer(nodeData.id, nodeData.type, nodeData.name);
    }

    // this.transactionGenerator.addNeighbor(node.id, node.name, 0);
    if (newNode.type === 'miner') {
      TransactionGenerator.getInstance().addNeighbor(newNode.id, newNode.name, Math.floor(Math.random() * 5));
    }

    this.nodeList.forEach((oldNode) => {
      let delay = Math.floor(Math.random() * 5);
      // oldNode.addNeighbor(newNode.id, newNode.name, 0);
      oldNode.addNeighbor(newNode.id, newNode.name, delay);
      // newNode.addNeighbor(oldNode.id, oldNode.name, 0);
      newNode.addNeighbor(oldNode.id, oldNode.name, delay);
    });

    this.nodeList.push(newNode);
  }

  /**
   * @public
   */
  addDelays(transactionDelays, nodeDelays) {
    transactionDelays.forEach((delay) => {
      TransactionGenerator.getInstance().addNeighbor(delay.nodeId, delay.time);
    });

    nodeDelays.forEach((delay) => {
      this.nodeList.forEach((node) => {
        if (node.id === delay.nodeId[0]) {
          node.addNeighbor(delay.nodeId[1], delay.time);
        } else if (node.id === delay.nodeId[1]) {
          node.addNeighbor(delay.nodeId[0], delay.time);
        }
      });
    });
  }

  /**
   * @public
   */
  start() {
    this.nodeList.forEach((node) => {
      node.initBlockchain();
    });
    // test
    TransactionGenerator.getInstance().publish();
    TransactionGenerator.getInstance().publish();
  }

  /**
   * @public
   */
  getNodesInfo() {
    let info = [];
    const transactionGenerator = TransactionGenerator.getInstance();
    info.push({
      id: transactionGenerator.id,
      type: transactionGenerator.type,
      neighbors: transactionGenerator.neighbors,
    });
    this.nodeList.forEach((node) => {
      info.push({
        id: node.id,
        name: node.name,
        type: node.type,
        color: node.color,
        neighbors: node.neighbors,
        miningTime: node.miningTime,
        minValue: node.minValue,
        mineNumber: node.mineNumber,
        maxPending: node.maxPending,
      });
    });

    return info;
  }

  /**
   * @public
   */
  updateNode(data) {
    switch (data.action) {
      case 'update node name':
        this.nodeList.forEach((node) => {
          if (node.id === data.id) {
            node.name = data.value;
          } else {
            node.neighbors.forEach((neighbor) => {
              if (neighbor.id === data.id) {
                neighbor.name = data.value;
              }
            });
          }
        });
        TransactionGenerator.getInstance().neighbors.forEach((neighbor) => {
          if (neighbor.id === data.id) {
            neighbor.name = data.value;
          }
        });
        break;

      case 'update node color':
        this.nodeList.forEach((node) => {
          if (node.id === data.id) {
            node.color = data.value;
          }
        });
        break;

      case 'update node neighbor':
        this.nodeList.forEach((node) => {
          if (node.id === data.id) {
            node.neighbors.forEach((neighbor) => {
              if (neighbor.id === data.neighborId) {
                neighbor.delay = data.value;
              }
            });
          }
        });
        break;

      default:
        break;
    }
    return true;
  }

  /**
   * @public
   */
  updateStrategy(data) {
    switch (data.action) {
      case 'update mining time':
        this.nodeList.forEach((node) => {
          if (node.id === data.id) {
            node.miningTime = data.value;
          }
        });
        break;

      case 'update min value':
        this.nodeList.forEach((node) => {
          if (node.id === data.id) {
            node.minValue = data.value;
          }
        });
        break;

      case 'update mine number':
        this.nodeList.forEach((node) => {
          if (node.id === data.id) {
            node.mineNumber = data.value;
          }
        });
        break;

      case 'update max pending':
        this.nodeList.forEach((node) => {
          if (node.id === data.id) {
            node.maxPending = data.value;
          }
        });
        break;

      default:
        break;
    }

    return true;
  }

  /**
   * @public
   */
  publishTransaction(data) {
    TransactionGenerator.getInstance().publish(data.reward);
  }
}

module.exports = Simulator;
