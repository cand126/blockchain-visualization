const Hash = require('./helper/Hash');

/**
 * @public
 */
class Visualizer {
  /**
   * @public
   */
  constructor() {
    this.nodeList = [];
  }

  /**
   * singleton
   */
  static getInstance() {
    if (!this.instance) {
      this.instance = new Visualizer();
    }
    return this.instance;
  }

  /**
   * @public
   */
  addNode(nodeId) {
    this.nodeList.push({
      nodeId: nodeId,
      blockchain: [],
    });
  }

  /**
   * @public
   */
  addBlock(data) {
    // let line = new THREE.Line(lineGeometry, lineMaterial);

    // this.scene.add(line);
  }

  /**
   * @public
   */
  updateBlockchain(action, data) {
    let node = this.nodeList.find((node) => {
      if (node.nodeId === data.nodeId) {
        return node;
      }
    });
    let newBlock = data.block;
    let changedBlocks = [];
    if (newBlock.previous === 'null') {
      // initial block
      newBlock.position = {
        x: 0,
        y: 0,
        z: 0,
      };
      node.blockchain.push(newBlock);
      changedBlocks.push(newBlock);
    } else {
      // received blocks

      // const lineGeometry = new THREE.Geometry();
      // const lineMaterial = new THREE.LineBasicMaterial({
      //     color: 0x000000,
      // });

      // initialize each layer
      // if (typeof this.layers[block.layer] === 'undefined') {
      //   this.layers[block.layer] = 0;
      // }
      // const previousBlock = this.scene.children.find((object) => {
      //   if (object.data.id === block.previous) {
      //     return object;
      //   }
      // });
      // blockObject.position.set(
      //   previousBlock.position.x + this.blockSpace.x + this.blockSize.x,
      //   previousBlock.position.y - ((this.blockSpace.y + this.blockSize.y) * this.layers[block.layer]),
      //   0
      // );
      // this.layers[block.layer] += 1;
    }
    let appSocket = require('../appSocket');
    appSocket.updateVisualization(action, {
      nodeId: data.nodeId,
      blocks: changedBlocks,
    });
  }
}

module.exports = Visualizer;
