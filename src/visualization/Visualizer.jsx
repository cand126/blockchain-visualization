import React, {Component} from 'react';
import * as THREE from 'three';
import './Visualizer.css';
import Watchdog from '../watchdog/Watchdog';
import Hash from '../helper/Hash';

/**
 * Visualizer
 * @class
 */
class Visualizer extends Component {
  constructor(props) {
    super(props);
    this.watchdog = Watchdog.getInstance();
    this.blockSize = new THREE.Vector3(32, 32, 0);
    this.blockSpace = new THREE.Vector3(16, 16, 0);
    // records the number of blocks in each layer
    this.layers = [];
    this.minerId = this.props.minerId;

    // binding
    this._animate = this._animate.bind(this);
  }

  componentDidMount() {
    // subscribe
    this.watchdog.addVisualizer(this);
    this._init();
    this._animate();
    // add initial block
    // this.addBlock();
  }

  _init() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.OrthographicCamera();
    this.renderer = new THREE.WebGLRenderer();

    this.scene.background = new THREE.Color(0xf0f0f0);

    this.canvasWidth = this.canvasContainer.clientWidth;
    this.canvasHeight = this.canvasContainer.clientHeight;
    this.canvasWidthHalf = this.canvasWidth / 2;
    this.canvasHeightHalf = this.canvasHeight / 2;
    this.margin = 16;
    this.renderer.setClearColor(0xFFFFFF, 1);
    this.renderer.setSize(this.canvasWidth, this.canvasHeight);
    this.canvasContainer.appendChild(this.renderer.domElement);

    this.camera.left = -this.canvasWidth / 2;
    this.camera.right = this.canvasWidth / 2;
    this.camera.top = this.canvasHeight / 2;
    this.camera.bottom = -this.canvasHeight / 2;
    this.camera.near = 0.1;
    this.camera.far = 1000;
    this.camera.position.z = 50;
    this.camera.updateProjectionMatrix();
  }

  _animate() {
    // loop
    requestAnimationFrame(this._animate);
    this.renderer.render(this.scene, this.camera);
  }

  addBlock(block) {
    const blockGeometry = new THREE.BoxGeometry(this.blockSize.x, this.blockSize.y, this.blockSize.z);
    const blockMaterial = new THREE.MeshBasicMaterial({
      color: new THREE.Color(0xff0000),
      // transparent: true,
      // opacity: 0.5
    });
    let blockObject = new THREE.Mesh(blockGeometry, blockMaterial);
    blockObject.data = block;
    if (block.id === Hash.generateNull()) {
      this.layers[0] = 1;
      // initial blocks
      blockObject.position.set(
        -this.canvasWidthHalf + (this.blockSize.x / 2) + this.margin,
        this.canvasHeightHalf - (this.blockSize.y / 2) - this.margin,
        0
      );
    } else {
      // received blocks

      // const lineGeometry = new THREE.Geometry();
      // const lineMaterial = new THREE.LineBasicMaterial({
      //     color: 0x000000,
      // });

      // initialize each layer
      if (typeof this.layers[block.layer] === 'undefined') {
        this.layers[block.layer] = 0;
      }
      this.scene.children.find((object) => {
        if (object.data.id === block.previous) {
          blockObject.position.set(
            object.position.x + this.blockSpace.x + this.blockSize.x,
            object.position.y - ((this.blockSpace.y + this.blockSize.y) * this.layers[block.layer]),
            0
          );
        }
      });
      this.layers[block.layer] += 1;
    }

    // let line = new THREE.Line(lineGeometry, lineMaterial);
    this.scene.add(blockObject);
    // this.scene.add(line);
  }

  render() {
    return (
      <div
        className="d-flex flex-column Visualizer"
        ref={(canvasContainer) => {
          this.canvasContainer = canvasContainer;
        }}>
      </div>
    );
  }
}

export default Visualizer;
