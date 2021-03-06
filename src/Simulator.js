const TransactionGenerator = require('./agents/TransactionGenerator');
const Miner = require('./agents/Miner');
const Nonminer = require('./agents/Nonminer');
const Hash = require('./helper/Hash');

class Simulator {
  constructor() {
    this.nodeList = []; // contains all the instances of nodes
    this.transactionGenerator = null;
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new Simulator();
    }
    return this.instance;
  }

  static reset() {
    // disconnect all the agents
    this.instance.nodeList.forEach((agent) => {
      agent.disconnect();
    });
    this.instance.nodeList = [];
    this.instance = new Simulator();
  }

  init(data) {
    data.nodes.forEach((node) => {
      this._addNode(node);
    });

    // Add each node's neighbors
    data.delays.forEach((delay) => {
      let node = this.nodeList.find((n) => n.id === delay.id);
      delay.neighbors.forEach((neighbor) => {
        for (let i = 0; i < node.neighbors.length; i++) {
          if (node.neighbors[i].id === neighbor.id) {
            node.neighbors[i].delay = neighbor.seconds;
          }
        }
      });
    });

    data.transactions.forEach((transaction) => {
      let newTransaction = this.transactionGenerator.generate(transaction.reward);
      setTimeout(() => {
        this.transactionGenerator.publish(newTransaction);
      }, transaction.delay * 1000);
    });
  }

  addNodeByType(nodeType) {
    let nodeData = {};
    if (nodeType === 'miner') {
      nodeData = {
        id: Hash.generateId(),
        type: 'miner',
        color: '#555555',
        name: 'New Miner',
        miningTime: Math.floor(Math.random() * 5) + 5,
        minValue: Math.floor(Math.random() * 10) + 1,
        mineNumber: Math.floor(Math.random() * 3) + 1,
        maxPending: Math.floor(Math.random() * 5) + 10,
      };
    } else if (nodeType === 'nonminer') {
      nodeData = {
        id: Hash.generateId(),
        type: 'nonminer',
        name: 'New Nonminer',
      };
    }

    if (this.transactionGenerator === null) {
      let transactionGeneratorData = {
        id: Hash.generateId(),
        type: 'generator',
      };
      this._addNode(transactionGeneratorData);
    }
    this._addNode(nodeData);
  }

  _addNode(nodeData) {
    let newNode = null;

    if (nodeData.type === 'generator') {
      newNode = new TransactionGenerator(
        nodeData.id
      );
      this.transactionGenerator = newNode;
    } else if (nodeData.type === 'miner') {
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

    // Add neighbors
    this.nodeList.forEach((oldNode) => {
      if (oldNode.type === 'generator') {
        if (newNode.type === 'miner') {
          oldNode.addNeighbor(
            newNode.id,
            newNode.name,
            0
          );
        }
      } else {
        oldNode.addNeighbor(
          newNode.id,
          newNode.name,
          0
        );
        newNode.addNeighbor(
          oldNode.id,
          oldNode.name,
          0
        );
      }
    });

    if (newNode.type !== 'generator') {
      newNode.initBlockchain();
    }

    this.nodeList.push(newNode);
  }

  deleteNode(nodeId) {
    this.nodeList.forEach((node) => {
      node.deleteNeighbor(nodeId);
    });

    for (let i = 0; i < this.nodeList.length; i++) {
      if (this.nodeList[i].id === nodeId) {
        this.nodeList.splice(i, 1);
        i -= 1;
      }
    }
  }

  getNodesInfo() {
    let info = [];

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

  getBlockchain(nodeId) {
    for (let i = 0; i < this.nodeList.length; i++) {
      if (this.nodeList[i].id === nodeId) {
        return this.nodeList[i].blockchain;
      }
    }
  }

  getCurrentBlock(nodeId) {
    for (let i = 0; i < this.nodeList.length; i++) {
      if (this.nodeList[i].id === nodeId) {
        return this.nodeList[i].currentBlock;
      }
    }
  }

  getTransactionPoolLength(nodeId) {
    for (let i = 0; i < this.nodeList.length; i++) {
      if (this.nodeList[i].id === nodeId) {
        return this.nodeList[i].transactionPool.length;
      }
    }
  }

  getReward(nodeId) {
    for (let i = 0; i < this.nodeList.length; i++) {
      if (this.nodeList[i].id === nodeId) {
        return this.nodeList[i].totalReward;
      }
    }
  }

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

        let appSocket = require('../appSocket');
        appSocket.updateVisualization('update neighbor name', {
          neighborId: data.nodeId,
          neighborName: data.value,
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

  publishTransaction(data) {
    let transaction = this.transactionGenerator.generate(data.reward);
    this.transactionGenerator.publish(transaction);
  }
}

module.exports = Simulator;
