import React, {Component} from 'react';
import * as THREE from 'three';
import './Visualizer.css';

/**
 * Visualizer
 * @class
 */
class Visualizer extends Component {
  constructor(props) {
    super(props);
    this.blockSize = new THREE.Vector3(32, 32, 0);

    // binding
    this._animate = this._animate.bind(this);
  }

  componentDidMount() {
    this._init();
    this._animate();
    this._addBlock();
  }

  _init() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.OrthographicCamera();
    this.renderer = new THREE.WebGLRenderer();

    this.scene.background = new THREE.Color( 0xf0f0f0 );

    this.canvasWidth = this.canvasContainer.clientWidth;
    this.canvasHeight = this.canvasContainer.clientHeight;
    // canvasWidthHalf = canvasWidth / 2;
    // canvasHeightHalf = canvasHeight / 2;
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

  _addBlock() {
    let blockGeometry = new THREE.BoxGeometry(this.blockSize.x, this.blockSize.y, this.blockSize.z);
    let blockMaterial = new THREE.MeshBasicMaterial({
      color: new THREE.Color(0xff0000),
      // transparent: true,
      // opacity: 0.5
    });
    let block = new THREE.Mesh(blockGeometry, blockMaterial);
    block.position.set(0, 0, 0);

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
    this.scene.add(block);
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
