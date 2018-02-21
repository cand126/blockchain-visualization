const TransactionGenerator = require('./agents/TransactionGenerator');
const Miner = require('./agents/Miner');
const Nonminer = require('./agents/Nonminer');
const Hash = require('./helper/Hash');

/**
 * Responible for managing the blockchain system.
 * @class
 * @public
 */
class Simulator {
  /**
   * @constructor
   * @private
   */
  constructor() {
    this.nodeList = []; // contains all the instances of nodes

    // test
    this.addNode({
      id: Hash.generateId(),
      type: 'miner',
      color: '#e53935',
      name: 'Alice',
      miningTime: Math.floor(Math.random() * 5) + 5,
      minValue: Math.floor(Math.random() * 10) + 1,
      mineNumber: Math.floor(Math.random() * 3) + 1,
      maxPending: Math.floor(Math.random() * 5) + 10,
    });
    this.addNode({
      id: Hash.generateId(),
      type: 'miner',
      color: '#03a9f4',
      name: 'Bob',
      miningTime: Math.floor(Math.random() * 5) + 5,
      minValue: Math.floor(Math.random() * 10) + 1,
      mineNumber: Math.floor(Math.random() * 3) + 1,
      maxPending: Math.floor(Math.random() * 5) + 10,
    });
    this.addNode({
      id: Hash.generateId(),
      type: 'miner',
      color: '#4caf50',
      name: 'Charlie',
      miningTime: Math.floor(Math.random() * 5) + 5,
      minValue: Math.floor(Math.random() * 10) + 1,
      mineNumber: Math.floor(Math.random() * 3) + 1,
      maxPending: Math.floor(Math.random() * 5) + 10,
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
   * Singleton pattern.
   * @function
   * @static
   * @return {object} The instance of the class.
   */
  static getInstance() {
    if (!this.instance) {
      this.instance = new Simulator();
    }
    return this.instance;
  }

  /**
   * Instantiate a node.
   * @function
   * @public
   * @param {object} nodeData - The required information for a node.
   */
  addNode(nodeData) {
    let newNode = null;

    if (nodeData.type === 'miner') {
      newNode = new Miner(
        nodeData.id,
        nodeData.name,
        nodeData.color,
        nodeData.miningTime,
        nodeData.minValue,
        nodeData.mineNumber,
        nodeData.maxPending
      );
    } else if (nodeData.type === 'nonminer') {
      newNode = new Nonminer(
        nodeData.id,
        nodeData.name
      );
    }

    // Add the new node as a neighbor to the transaction genertor
    if (newNode.type === 'miner') {
      TransactionGenerator.getInstance().addNeighbor(
        newNode.id,
        newNode.name,
        Math.floor(Math.random() * 5)
      );
    }

    // Update the neighbors of the whole nodes.
    this.nodeList.forEach((oldNode) => {
      const delay = Math.floor(Math.random() * 5);
      oldNode.addNeighbor(
        newNode.id,
        newNode.name,
        delay
      );
      newNode.addNeighbor(
        oldNode.id,
        oldNode.name,
        delay
      );
    });

    newNode.initBlockchain();
    this.nodeList.push(newNode);
  }

  /**
   * Get the information of all nodes.
   * @function
   * @public
   * @return {object}
   */
  getNodesInfo() {
    let info = [];
    const transactionGenerator = TransactionGenerator.getInstance();

    // Information of the transaction generator.
    info.push({
      nodeId: transactionGenerator.id,
      type: transactionGenerator.type,
      neighbors: transactionGenerator.neighbors,
    });

    // Information of miners and nonminers.
    this.nodeList.forEach((node) => {
      info.push({
        nodeId: node.id,
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
   * Get the information of the blockchain of specific node.
   * @function
   * @public
   * @param {string} nodeId
   * @return {bool} True for successes, false for errors.
   */
  getBlockchain(nodeId) {
    for (let i = 0; i < this.nodeList.length; i++) {
      if (this.nodeList[i].id === nodeId) {
        return this.nodeList[i].blockchain;
      }
    }
  }

  /**
   * Update the information of specific node.
   * @function
   * @public
   * @param {object} data - Contains the action and the required data.
   * @return {bool} True for successes, false for errors.
   */
  updateNode(data) {
    switch (data.action) {
      case 'update node name':
        this.nodeList.forEach((node) => {
          if (node.id === data.nodeId) {
            node.name = data.value;
          } else {
            // update the name in the neighbors
            node.neighbors.forEach((neighbor) => {
              if (neighbor.id === data.nodeId) {
                neighbor.name = data.value;
              }
            });
          }
        });
        // update the name in the neighbors
        TransactionGenerator.getInstance().neighbors.forEach((neighbor) => {
          if (neighbor.id === data.nodeId) {
            neighbor.name = data.value;
          }
        });
        break;

      case 'update node color':
        this.nodeList.forEach((node) => {
          if (node.id === data.nodeId) {
            node.color = data.value;
          }
        });
        break;

      case 'update node neighbor':
        const transactionGenerator = TransactionGenerator.getInstance();
        if (transactionGenerator.id === data.nodeId) {
          transactionGenerator.neighbors.forEach((neighbor) => {
            if (neighbor.id === data.neighborId) {
              neighbor.delay = Number(data.value);
            }
          });
          break;
        }
        this.nodeList.forEach((node) => {
          if (node.id === data.nodeId) {
            node.neighbors.forEach((neighbor) => {
              if (neighbor.id === data.neighborId) {
                neighbor.delay = Number(data.value);
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
   * Update the strategies of specific miner.
   * @function
   * @public
   * @param {object} data - Contains the action and the required data.
   * @return {bool} True for successes, false for errors.
   */
  updateStrategy(data) {
    switch (data.action) {
      case 'update mining time':
        this.nodeList.forEach((node) => {
          if (node.id === data.nodeId) {
            node.miningTime = data.value;
          }
        });
        break;

      case 'update min value':
        this.nodeList.forEach((node) => {
          if (node.id === data.nodeId) {
            node.minValue = data.value;
          }
        });
        break;

      case 'update mine number':
        this.nodeList.forEach((node) => {
          if (node.id === data.nodeId) {
            node.mineNumber = data.value;
          }
        });
        break;

      case 'update max pending':
        this.nodeList.forEach((node) => {
          if (node.id === data.nodeId) {
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
   * Publish transactions through the transaction generator.
   * @function
   * @public
   * @param {object} data - Contains the reward of the transaction.
   */
  publishTransaction(data) {
    TransactionGenerator.getInstance().publish(data.reward);
  }

  /**
   * Get the length of the transaction pool of specific miner.
   * @function
   * @public
   * @param {object} nodeId
   * @return {number}
   */
  getTransactionPoolLength(nodeId) {
    for (let i = 0; i < this.nodeList.length; i++) {
      if (this.nodeList[i].id === nodeId) {
        return this.nodeList[i].transactionPool.length;
      }
    }
  }
}

module.exports = Simulator;
