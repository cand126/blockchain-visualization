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
    console.log('add');
    const blockGeometry = new THREE.BoxGeometry(this.blockSize.x, this.blockSize.y, this.blockSize.z);
    const blockMaterial = new THREE.MeshBasicMaterial({
      color: new THREE.Color(0xff0000),
      // transparent: true,
      // opacity: 0.5
    });
    let blockObject = new THREE.Mesh(blockGeometry, blockMaterial);
    blockObject.data = block;
    if (block.id === Hash.generateNull()) {
      // initial blocks
      blockObject.position.set(
        -this.canvasWidthHalf + (this.blockSize.x / 2) + this.margin,
        this.canvasHeightHalf - (this.blockSize.y / 2) - this.margin,
        0
      );
    } else {
      // received blocks
      const lineGeometry = new THREE.Geometry();
      const lineMaterial = new THREE.LineBasicMaterial({
          color: 0x000000,
      });
      // this.list.find((element) => {
      //   if (element.name === blockName) {
      //     return element;
      //   }
      // });
    }

    // let lineGeometry = new THREE.Geometry();
    // let lineMaterial = new THREE.LineBasicMaterial({
    //   color: 0x000000,
    // });

    // if (this.number === 0) {
    //   block.position.set(this.initialPosition.x, this.initialPosition.y, 0);
    //   this.list.push(block);
    // } else {
    //   let previousBlockPosition = this.getPosition(data.prev);
    //   switch (this.getFreePoint(data.prev)) {
    //     case 'top':
    //       block.position.set(previousBlockPosition.x, previousBlockPosition.y + this.distance + this.size.y, 0);
    //       this.list.push(block);
    //       lineGeometry.vertices.push(this.getTop(data.prev));
    //       lineGeometry.vertices.push(this.getBottom(data.name));
    //       break;

    //     case 'right':
    //       block.position.set(previousBlockPosition.x + this.distance + this.size.x, previousBlockPosition.y + this.distance + this.size.y, 0);
    //       this.list.push(block);
    //       lineGeometry.vertices.push(this.getRight(data.prev));
    //       lineGeometry.vertices.push(new THREE.Vector3(this.getBottom(data.name).x, this.getRight(data.prev).y, 0));
    //       lineGeometry.vertices.push(this.getBottom(data.name));
    //       break;

    //     case 'left':
    //       block.position.set(previousBlockPosition.x - this.distance - this.size.x, previousBlockPosition.y + this.distance + this.size.y, 0);
    //       this.list.push(block);
    //       lineGeometry.vertices.push(this.getLeft(data.prev));
    //       lineGeometry.vertices.push(new THREE.Vector3(this.getBottom(data.name).x, this.getLeft(data.prev).y, 0));
    //       lineGeometry.vertices.push(this.getBottom(data.name));
    //       break;
    //   }
    // }

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
