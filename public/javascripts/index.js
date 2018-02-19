let canvasList = [];
let canvasWidth;
let canvasHeight;
let socket;
let blockSize = 32;
let canvasMargin = 16;
let blockSpace = 16;

$(document).ready(() => {
  initSocket();
  initCanvas();
});

/**
 * @public
 */
function initSocket() {
  socket = io.connect();

  socket.on('connect', () => {
    socket.on('finish', (data) => {
      if (data.status === 'success') {
        $('#savingSpinner').hide();
      }
    });

    socket.on('update transaction pool', (data) => {
      let progressBars = document.getElementsByName('transactionPool');
      for (let i = 0; i < progressBars.length; i++) {
        if (progressBars[i].getAttribute('data-nodeid') === data.id) {
          progressBars[i].setAttribute('aria-valuenow', data.length);
          progressBars[i].style.width = progressBars[i].getAttribute('aria-valuenow') / progressBars[i].getAttribute('aria-valuemax') * 100 + '%';
        }
      }
    });

    socket.on('update mining progress', (data) => {
      let progressBars = document.getElementsByName('miningProcess');
      for (let i = 0; i < progressBars.length; i++) {
        if (progressBars[i].getAttribute('data-nodeid') === data.id) {
          progressBars[i].setAttribute('aria-valuenow', data.progress);
          progressBars[i].style.width = progressBars[i].getAttribute('aria-valuenow') / progressBars[i].getAttribute('aria-valuemax') * 100 + '%';
        }
      }
    });

    socket.on('update blockchain', (data) => {
      let canvas = canvasList.find((canvas) => {
        if (canvas.nodeId === data.nodeId) {
          return canvas;
        }
      });
      updateCanvas(canvas, data.blockchain);
    });
  });
}

/**
 * @public
 */
function initCanvas() {
  let canvasContainers = document.getElementsByName('canvas-container');
  for (let i = 0; i < canvasContainers.length; i++) {
    addCanvas(canvasContainers[i]);
  }
  animate();

  canvasList.forEach((canvas) => {
    socket.emit('init blockchain', {
      nodeId: canvas.nodeId,
    });
  });
}

/**
 * @public
 */
function publishTransaction() {
  socket.emit('publish transaction', {
    reward: document.getElementById('transactionReward').value,
  });
}

/**
 * @public
 */
function updateNode(action, nodeId, value, neighborId = null) {
  $('#savingSpinner').show();
  socket.emit('update node', {
    nodeId: nodeId,
    action: action,
    value: value,
    neighborId: neighborId,
  });
}

/**
 * @public
 */
function updateStrategy(action, nodeId, value) {
  $('#savingSpinner').show();
  socket.emit('update strategy', {
    nodeId: nodeId,
    action: action,
    value: value,
  });
}

/**
 * @public
 */
function addCanvas(canvasContainer) {
  if (!canvasWidth || !canvasHeight) {
    canvasWidth = canvasContainer.clientWidth;
    canvasHeight = canvasContainer.clientHeight;
  }

  let renderer = new THREE.WebGLRenderer();
  let scene = new THREE.Scene();
  let camera = new THREE.OrthographicCamera();

  renderer.setClearColor(0xFFFFFF, 1);
  renderer.setSize(canvasWidth, canvasHeight);

  scene.background = new THREE.Color(0xf0f0f0);

  camera.left = -canvasWidth / 2;
  camera.right = canvasWidth / 2;
  camera.top = canvasHeight / 2;
  camera.bottom = -canvasHeight / 2;
  camera.near = 0.1;
  camera.far = 1000;
  camera.position.z = 50;
  camera.updateProjectionMatrix();

  canvasContainer.appendChild(renderer.domElement);

  canvasList.push({
    nodeId: canvasContainer.id.split('-')[2],
    renderer: renderer,
    scene: scene,
    camera: camera,
  });
}

/**
 * @public
 */
function animate() {
  // loop
  requestAnimationFrame(animate);
  canvasList.forEach((canvas) => {
    canvas.renderer.render(canvas.scene, canvas.camera);
  });
}

/**
 * @public
 */
function updateCanvas(canvas, blockchain) {
  for (let i = blockchain.length - 1; i >= 0; i--) {
    let blockObject = canvas.scene.getObjectByName(blockchain[i].id);
    if (typeof blockObject === 'undefined') {
      const blockGeometry = new THREE.BoxGeometry(blockSize, blockSize, 0);
      const blockMaterial = new THREE.MeshBasicMaterial({
        color: new THREE.Color(blockchain[i].color),
        // transparent: true,
        // opacity: 0.5
      });
      let blockObject = new THREE.Mesh(blockGeometry, blockMaterial);
      blockObject.name = blockchain[i].id;
      if (blockchain[i].previous === 'null') {
        blockObject.position.set(
          -(canvasWidth / 2) + (blockSize / 2) + canvasMargin,
          (canvasHeight / 2) - (blockSize / 2) - canvasMargin,
          0,
        );
      }

      canvas.scene.add(blockObject);
    }
  }
}

