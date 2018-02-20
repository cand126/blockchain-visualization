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
  initProgress();

  // implicit iteration
  $('div[name="canvas-container"]').mousedown((e) => {
    onDocumentMouseDown(e);
  });
    $('div[name="canvas-container"]').mouseup((e) => {
    onDocumentMouseUp(e);
  });
    $('div[name="canvas-container"]').mouseleave((e) => {
    onDocumentMouseLeave(e);
  });
});

$(window).resize(() => {
  canvasWidth = $('div[name="canvas-container"]').first().width();
  canvasHeight = $('div[name="canvas-container"]').first().height();

  canvasList.forEach((canvas) => {
    canvas.camera.left = -canvasWidth / 2;
    canvas.camera.right = canvasWidth / 2;
    canvas.camera.top = canvasHeight / 2;
    canvas.camera.bottom = -canvasHeight / 2;
    canvas.camera.updateProjectionMatrix();
    canvas.renderer.setSize(canvasWidth, canvasHeight);
  });
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
        if (progressBars[i].getAttribute('data-nodeid') === data.nodeId) {
          progressBars[i].setAttribute('aria-valuenow', data.length);
          progressBars[i].style.width = progressBars[i].getAttribute('aria-valuenow') / progressBars[i].getAttribute('aria-valuemax') * 100 + '%';
        }
      }
    });

    socket.on('update mining progress', (data) => {
      let progressBars = document.getElementsByName('miningProcess');
      for (let i = 0; i < progressBars.length; i++) {
        if (progressBars[i].getAttribute('data-nodeid') === data.nodeId) {
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
      updateCanvas(canvas, data.blocks);
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
function initProgress() {
  let progressBars = document.getElementsByName('transactionPool');
  for (let i = 0; i < progressBars.length; i++) {
    socket.emit('init transaction pool', {
      nodeId: progressBars[i].getAttribute('data-nodeid'),
    });
  }
}

/**
 * @public
 */
function onDocumentMouseDown(e) {
  let canvas = canvasList.find((canvas) => {
    if (canvas.nodeId === $(e.target).parent().attr('data-nodeId')) {
      return canvas;
    }
  });
  $(e.target).mousemove((e) => {
    onDocumentMouseMove(e, canvas);
  });
};

/**
 * @public
 */
function onDocumentMouseUp(e) {
  $(e.target).unbind('mousemove');
  let canvas = canvasList.find((canvas) => {
    if (canvas.nodeId === $(e.target).parent().attr('data-nodeId')) {
      return canvas;
    }
  });
  canvas.mousePosition.x = -1;
  canvas.mousePosition.y = -1;
};

/**
 * @public
 */
function onDocumentMouseLeave(e) {
  $(e.target).unbind('mousemove');
  let canvas = canvasList.find((canvas) => {
    if (canvas.nodeId === $(e.target).parent().attr('data-nodeId')) {
      return canvas;
    }
  });
  canvas.mousePosition.x = -1;
  canvas.mousePosition.y = -1;
};

/**
 * @public
 */
function onDocumentMouseMove(e, canvas) {
  e.preventDefault();
  const rect = canvas.renderer.domElement.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  if (canvas.mousePosition.x !== -1 && canvas.mousePosition.y !== -1) {
      const distanceX = -(x - canvas.mousePosition.x);
      const distanceY = y - canvas.mousePosition.y;
      canvas.camera.position.set(canvas.camera.position.x + distanceX, canvas.camera.position.y + distanceY, canvas.camera.position.z);
      canvas.camera.updateProjectionMatrix();
  }
  canvas.mousePosition.x = x;
  canvas.mousePosition.y = y;
};

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
    mousePosition: {
      x: -1,
      y: -1,
    },
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
  for (let i = 0; i < blockchain.length; i++) {
    let blockObject = canvas.scene.getObjectByName(blockchain[i].id);
    if (typeof blockObject === 'undefined') {
      // new block
      const blockGeometry = new THREE.BoxGeometry(blockSize, blockSize, 0);
      const blockMaterial = new THREE.MeshBasicMaterial({
        color: new THREE.Color(blockchain[i].color),
        // transparent: true,
        // opacity: 0.5
      });
      let blockObject = new THREE.Mesh(blockGeometry, blockMaterial);
      blockObject.name = blockchain[i].id;
      if (blockchain[i].previous === 'null') {
        blockObject.position.set(-(canvasWidth / 2) + (blockSize / 2) + canvasMargin,
          (canvasHeight / 2) - (blockSize / 2) - canvasMargin,
          0,
        );
        blockObject.row = 0;
        blockObject.previousBlock = 'null';
        blockObject.nextBlocks = 0;
      } else {
        let previousblockObject = canvas.scene.getObjectByName(blockchain[i].previous);
        blockObject.row = previousblockObject.row + previousblockObject.nextBlocks;
        blockObject.previousBlock = previousblockObject.name;
        blockObject.nextBlocks = 0;
        blockObject.position.set(
          previousblockObject.position.x + blockSpace + blockSize,
          previousblockObject.position.y - ((blockSpace + blockSize) * previousblockObject.nextBlocks),
          0,
        );
        if (previousblockObject.nextBlocks > 0) {
          canvas.scene.traverse((object) => {
            if (object instanceof THREE.Mesh) {
              if (object.row >= blockObject.row) {
                object.row += 1;
                let previousPosition = object.position;
                object.position.set(
                  previousPosition.x,
                  previousPosition.y - (blockSpace + blockSize),
                  0,
                );
              }
            }
          });
        }

        previousblockObject.nextBlocks += 1;
        console.log(previousblockObject);
        console.log(blockObject);
      }

      canvas.scene.add(blockObject);
    }
  }
}
