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
    let block = data.block;
    let newBlockchain = [];
    if (data.block.id === Hash.generateNull()) {
      // initial block
      // this.layers[0] = 1;
      // block.position = {
      //   x: -this.canvasWidthHalf + (this.blockSize.x / 2) + this.margin,
      //   y: this.canvasHeightHalf - (this.blockSize.y / 2) - this.margin,
      //   z: 0,
      // };
      block.position = {
        x: 0,
        y: 0,
        z: 0,
      };
      newBlockchain.push(block);
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
      blockchain: newBlockchain,
    });
  }
}

module.exports = Visualizer;
