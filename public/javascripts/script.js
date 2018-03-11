/* global THREE io:true */

let canvasList = []; // contains all canvas
let canvasWidth;
let canvasHeight;
let canvasMargin = 16;
let blockSize = 32;
let blockSpace = 16;
let socket;

$(document).ready(() => {
  initSocket();
  initCanvas();
  initProgress();
  initReward();

  // implicit iteration
  $('div[name="canvas-container"]').mousedown((e) => {
    onCanvasMouseDown(e);
  });
  $('div[name="canvas-container"]').mouseup((e) => {
    onCanvasMouseUp(e);
  });
  $('div[name="canvas-container"]').mouseleave((e) => {
    onCanvasMouseLeave(e);
  });
});

$(window).resize(() => {
  canvasWidth = $('div[name="canvas-container"]').first().width();
  canvasHeight = $('div[name="canvas-container"]').first().height();

  // resize each canvas
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
 * Initialize websockets.
 * @function
 */
function initSocket() {
  socket = io.connect();

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

  // signal for finishing updating
  socket.on('finish', (data) => {
    if (data.status === 'success') {
      $('#savingSpinner').hide();
    }
  });

  socket.on('update blockchain', (data) => {
    let canvas = canvasList.find((canvas) => canvas.nodeId === data.nodeId);
    updateCanvas(canvas, data.blocks, data.currentBlock);
  });

  socket.on('update neighbor name', (data) => {
    let neighbors = document.getElementsByName('neighborName');
    for (let i = 0; i < neighbors.length; i++) {
      if (neighbors[i].getAttribute('data-nodeid') === data.neighborId) {
        neighbors[i].innerText = data.neighborName;
      }
    }
  });

  socket.on('update reward', (data) => {
    let reward = document.getElementById('reward-' + data.nodeId);
    reward.innerText = data.reward;
  });

  socket.on('reload', (data) => {
    location.reload();
  });
}

/**
 * Initialize canvas.
 * @function
 */
function initCanvas() {
  let canvasContainers = document.getElementsByName('canvas-container');
  for (let i = 0; i < canvasContainers.length; i++) {
    addCanvas(canvasContainers[i]);
  }
  animate();

  canvasList.forEach((canvas) => {
    socket.emit('get blockchain', {
      nodeId: canvas.nodeId,
    });
  });
}

/**
 * Initialize progress bars.
 * @function
 */
function initProgress() {
  let progressBars = document.getElementsByName('transactionPool');
  for (let i = 0; i < progressBars.length; i++) {
    socket.emit('get transaction pool', {
      nodeId: progressBars[i].getAttribute('data-nodeid'),
    });
  }
}

/**
 * Initialize values of reward.
 * @function
 */
function initReward() {
  let rewards = document.getElementsByName('reward');
  for (let i = 0; i < rewards.length; i++) {
    socket.emit('get reward', {
      nodeId: rewards[i].getAttribute('data-nodeid'),
    });
  }
}

/**
 * Mousedown event.
 * @param {Event} e
 * @function
 */
function onCanvasMouseDown(e) {
  let canvas = canvasList.find((canvas) => canvas.nodeId === $(e.target).parent().attr('data-nodeId'));
  $(e.target).mousemove((e) => {
    onCanvasMouseMove(e, canvas);
  });
};

/**
 * Mouseup event.
 * @param {Event} e
 * @function
 */
function onCanvasMouseUp(e) {
  $(e.target).unbind('mousemove');
  let canvas = canvasList.find((canvas) => canvas.nodeId === $(e.target).parent().attr('data-nodeId'));
  if (typeof canvas !== 'undefined') {
    canvas.mousePosition.x = -1;
    canvas.mousePosition.y = -1;
  }
};

/**
 * Mouseleave event.
 * @param {Event} e
 * @function
 */
function onCanvasMouseLeave(e) {
  $(e.target).unbind('mousemove');
  let canvas = canvasList.find((canvas) => canvas.nodeId === $(e.target).parent().attr('data-nodeId'));

  if (typeof canvas !== 'undefined') {
    canvas.mousePosition.x = -1;
    canvas.mousePosition.y = -1;
  }
};

/**
 * Mousemove event.
 * @param {Event} e
 * @param {object} canvas
 * @function
 */
function onCanvasMouseMove(e, canvas) {
  e.preventDefault();
  const rect = canvas.renderer.domElement.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  if (canvas.mousePosition.x !== -1 && canvas.mousePosition.y !== -1) {
    const distanceX = -(x - canvas.mousePosition.x);
    const distanceY = y - canvas.mousePosition.y;
    canvas.camera.position.set(
      canvas.camera.position.x + distanceX,
      canvas.camera.position.y + distanceY,
      canvas.camera.position.z
    );
    canvas.camera.updateProjectionMatrix();
  }
  canvas.mousePosition.x = x;
  canvas.mousePosition.y = y;
};

/**
 * Zoom in the canvas.
 * @function
 * @param {Event} e
 * @param {string} nodeId
 */
function zoomIn(e, nodeId) {
  let canvas = canvasList.find((canvas) => canvas.nodeId === nodeId);
  canvas.camera.zoom += 0.1;
  canvas.camera.updateProjectionMatrix();
}

/**
 * Zoom out the canvas.
 * @function
 * @param {Event} e
 * @param {string} nodeId
 */
function zoomOut(e, nodeId) {
  let canvas = canvasList.find((canvas) => canvas.nodeId === nodeId);
  canvas.camera.zoom -= 0.1;
  canvas.camera.updateProjectionMatrix();
}

/**
 * Register enter keypress event for publishing transactions.
 * @function
 * @param {Event} event
 */
function registerEnter(event) {
  $(event.target).keypress((e) => {
    if (e.which == 13) {
      publishTransaction();
    }
  });
}

/**
 * Publish a transaction.
 * @function
 * @param {DOM} button
 */
function publishTransaction() {
  socket.emit('publish transaction', {
    reward: document.getElementById('transactionReward').value,
  });
  $('#publishAlert').show();
  $('#publishButton').blur();
  setTimeout(() => {
    $('#publishAlert').hide();
  }, 1500);
}

/**
 * Add a node.
 * @function
 * @param {string} nodeType
 */
function addNode(nodeType) {
  socket.emit('add node', {
    nodeType: nodeType,
  });
}

/**
 * Delete a node.
 * @function
 * @param {string} nodeId
 */
function deleteNode(nodeId) {
  socket.emit('delete node', {
    nodeId: nodeId,
  });
}

/**
 * Update nodes.
 * @param {string} action
 * @param {string} nodeId
 * @param {string} value
 * @param {string} [neighborId=null]
 * @function
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
 * Update strategies.
 * @param {string} action
 * @param {string} nodeId
 * @param {string} value
 * @function
 */
function updateStrategy(action, nodeId, value) {
  $('#savingSpinner').show();
  socket.emit('update strategy', {
    nodeId: nodeId,
    action: action,
    value: Number(value),
  });
}

function upload(file) {
  $('#initText').hide();
  $('#uploadingSpinner').show();
  let fr = new FileReader();
  fr.onload = function(e) {
    let result = JSON.parse(e.target.result);
    socket.emit('init blockchain system', result);
  };
  fr.readAsText(file);
}

/**
 * Instantiate a canvas.
 * @param {DOM} canvasContainer
 * @function
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
 * Update the frame.
 * @function
 */
function animate() {
  // loop
  requestAnimationFrame(animate);
  canvasList.forEach((canvas) => {
    canvas.renderer.render(canvas.scene, canvas.camera);
  });
}

/**
 * Update the objects on the canvas.
 * @param {object} canvas
 * @param {object[]} blockchain
 * @param {object} currentBlock
 * @function
 */
function updateCanvas(canvas, blockchain, currentBlock) {
  for (let i = 0; i < blockchain.length; i++) {
    let blockObject = canvas.scene.getObjectByName(blockchain[i].id);
    let lineObject;
    if (typeof blockObject === 'undefined') {
      const blockGeometry = new THREE.BoxGeometry(blockSize, blockSize, 0);
      const blockMaterial = new THREE.MeshBasicMaterial({
        color: new THREE.Color(blockchain[i].color),
        // transparent: true,
        // opacity: 0.5
      });
      let blockObject = new THREE.Mesh(blockGeometry, blockMaterial);
      blockObject.name = blockchain[i].id;

      const lineGeometry = new THREE.Geometry();
      const lineMaterial = new THREE.LineBasicMaterial({
        color: '#212121',
        linewidth: 3,
      });

      if (blockchain[i].previous === 'null') {
        blockObject.position.set(-(canvasWidth / 2) + (blockSize / 2) + canvasMargin,
          (canvasHeight / 2) - (blockSize / 2) - canvasMargin,
          0,
        );
        blockObject.row = 0;
        blockObject.previousBlock = 'null';
        blockObject.nextBlocks = 0;
        blockObject.previousLine = 'null';
        blockObject.nextLines = [];
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

        // set up lines
        if (previousblockObject.row === blockObject.row) {
          // straight lines
          lineGeometry.vertices.push(new THREE.Vector3(
            previousblockObject.position.x,
            previousblockObject.position.y,
            0
          ));
          lineGeometry.vertices.push(new THREE.Vector3(
            blockObject.position.x,
            blockObject.position.y,
            0
          ));
        } else {
          // lines with breakpoints
          lineGeometry.vertices.push(new THREE.Vector3(
            previousblockObject.position.x,
            previousblockObject.position.y,
            0
          ));
          lineGeometry.vertices.push(new THREE.Vector3(
            previousblockObject.position.x + (blockSize / 2) + (blockSpace / 2),
            previousblockObject.position.y,
            0
          ));
          lineGeometry.vertices.push(new THREE.Vector3(
            blockObject.position.x - (blockSize / 2) - (blockSpace / 2),
            blockObject.position.y,
            0
          ));
          lineGeometry.vertices.push(new THREE.Vector3(
            blockObject.position.x,
            blockObject.position.y,
            0
          ));
        }

        lineObject = new THREE.Line(lineGeometry, lineMaterial);
        previousblockObject.nextLines.push(lineObject.id);
        blockObject.previousLine = lineObject.id;
        blockObject.nextLines = [];

        // add a new row if necessary
        if (previousblockObject.nextBlocks > 0) {
          canvas.scene.traverse((object) => {
            if (object instanceof THREE.Mesh) {
              if (object.row >= blockObject.row) {
                object.row += 1;
                let newPosition = new THREE.Vector3(
                  object.position.x,
                  object.position.y - (blockSpace + blockSize),
                  0
                );
                object.position.set(
                  newPosition.x,
                  newPosition.y,
                  0,
                );
                // update lines
                let previousLineObject = canvas.scene.getObjectById(object.previousLine);
                previousLineObject.geometry.vertices[previousLineObject.geometry.vertices.length - 1].x = newPosition.x;
                previousLineObject.geometry.vertices[previousLineObject.geometry.vertices.length - 1].y = newPosition.y;
                if (previousLineObject.geometry.vertices.length === 4) {
                  previousLineObject.geometry.vertices[2].x = newPosition.x - (blockSize / 2) - (blockSpace / 2);
                  previousLineObject.geometry.vertices[2].y = newPosition.y;
                }
                previousLineObject.geometry.verticesNeedUpdate = true;
                object.nextLines.forEach((nextLine) => {
                  let nextLineObject = canvas.scene.getObjectById(nextLine);
                  nextLineObject.geometry.vertices[0].x = newPosition.x;
                  nextLineObject.geometry.vertices[0].y = newPosition.y;
                  if (nextLineObject.geometry.vertices.length === 4) {
                    nextLineObject.geometry.vertices[1].x = newPosition.x + (blockSize / 2) + (blockSpace / 2);
                    nextLineObject.geometry.vertices[1].y = newPosition.y;
                  }
                  nextLineObject.geometry.verticesNeedUpdate = true;
                });
              }
            }
          });
        }

        previousblockObject.nextBlocks += 1;
        canvas.scene.add(lineObject);
      }

      canvas.scene.add(blockObject);
    }

    // remove all outlines
    for (let i = 0; i < canvas.scene.children.length; i++) {
      const object = canvas.scene.children[i];
      if (object instanceof THREE.Mesh && object.blockchainOutline) {
        canvas.scene.remove(object);
      }
    }

    let currentObjectId = currentBlock;

    // mark the longest blockchain with outlines
    while (currentObjectId !== '00000000' && currentObjectId !== null) {
      let previousObjectId = null;
      canvas.scene.traverse((object) => {
        if (object instanceof THREE.Mesh && object.name === currentObjectId) {
          let blockOutlineMaterial = new THREE.MeshBasicMaterial({
            // color: '#000051',
            side: THREE.BackSide,
          });
          let blockOutline = new THREE.Mesh(object.geometry, blockOutlineMaterial);
          blockOutline.position.set(
            object.position.x,
            object.position.y,
            0
          );
          blockOutline.scale.multiplyScalar(1.10);
          blockOutline.blockchainOutline = true;
          blockOutlineMaterial.color.set('#1b1b1b');

          canvas.scene.add(blockOutline);
          previousObjectId = object.previousBlock;
        }
      });

      currentObjectId = previousObjectId;
    }
  }
}

