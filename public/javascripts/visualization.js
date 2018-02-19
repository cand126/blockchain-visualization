$(document).ready(() => {
  let canvasContainers = document.getElementsByName('canvas-container');
  for (let i = 0; i < canvasContainers.length; i++) {
    Visualizer.getInstance().addCanvas(canvasContainers[i]);
  }
  Visualizer.getInstance().animate();
});

class Visualizer {
  constructor() {
    this.canvasList = [];
    this.margin = 16;
    this.blockSize = new THREE.Vector3(32, 32, 0);
    this.blockSpace = new THREE.Vector3(16, 16, 0);
    this.animate = this.animate.bind(this);
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

  addCanvas(canvasContainer) {
    if (!this.canvasWidth || !this.canvasHeight) {
      this.canvasWidth = canvasContainer.clientWidth;
      this.canvasHeight = canvasContainer.clientHeight;
      this.canvasWidthHalf = this.canvasWidth / 2;
      this.canvasHeightHalf = this.canvasHeight / 2;
    }

    let renderer = new THREE.WebGLRenderer();
    let scene = new THREE.Scene();
    let camera = new THREE.OrthographicCamera();

    renderer.setClearColor(0xFFFFFF, 1);
    renderer.setSize(this.canvasWidth, this.canvasHeight);

    scene.background = new THREE.Color(0xf0f0f0);

    camera.left = -this.canvasWidth / 2;
    camera.right = this.canvasWidth / 2;
    camera.top = this.canvasHeight / 2;
    camera.bottom = -this.canvasHeight / 2;
    camera.near = 0.1;
    camera.far = 1000;
    camera.position.z = 50;
    camera.updateProjectionMatrix();

    canvasContainer.appendChild(renderer.domElement);

    this.canvasList.push({
      nodeId: canvasContainer.id.split('-')[2],
      renderer: renderer,
      scene: scene,
      camera: camera,
      layers: []
    });
  }

  animate() {
    // loop
    requestAnimationFrame(this.animate);
    this.canvasList.forEach((canvas) => {
      canvas.renderer.render(canvas.scene, canvas.camera);
    });
  }

  /**
   * @public
   */
  addBlock(nodeId, block) {
    const canvas = this.canvasList.find((canvas) => {
      if (canvas.id === nodeId) {
        return canvas;
      }
    });
    const blockGeometry = new THREE.BoxGeometry(this.blockSize.x, this.blockSize.y, this.blockSize.z);
    const blockMaterial = new THREE.MeshBasicMaterial({
      color: new THREE.Color(block.color),
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
      const previousBlock = this.scene.children.find((object) => {
        if (object.data.id === block.previous) {
          return object;
        }
      });
      blockObject.position.set(
        previousBlock.position.x + this.blockSpace.x + this.blockSize.x,
        previousBlock.position.y - ((this.blockSpace.y + this.blockSize.y) * this.layers[block.layer]),
        0
      );
      this.layers[block.layer] += 1;
    }

    // let line = new THREE.Line(lineGeometry, lineMaterial);
    canvas.scene.add(blockObject);
    // this.scene.add(line);
  }
}