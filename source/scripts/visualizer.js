'use strict';

// TODO: Documentation

var scene = new THREE.Scene();
var camera = new THREE.OrthographicCamera();
var renderer = new THREE.WebGLRenderer();

var FPS = 60;

// canvas size
var canvasWidth, canvasHeight;
var canvasWidthHalf, canvasHeightHalf;

// canvas margin
var canvasMargin = 20;

// store previous mouse position
var previousMousePosition = new THREE.Vector2(-1, -1);

// blocka and transaction parameters
var blockManager, transactionManager;
var blockSize = new THREE.Vector3(90, 90, 0);
var blockDistance = 30;
var blockPadding = 10;
var lineColor = 0x000000;
var transactionSize = new THREE.Vector3(60, 10, 0);
var transactionDistance = 20;
var transactionPendingColor = 0xc3bfb5;
var transactionMinedColor = 0xc3bfb5;

// TODO: delete
// var transactionNumber = 7;

// users
var userNumber = 20;
var userArray = [];
var colorArray = [
    '#FF3030',
    '#ADFF2F',
    '#BF3EFF',
    '#008B8B',
    '#CDC1C5'
];

/**********************************************************************
 *
 * Initialization
 * 
 **********************************************************************/

function initRenderer() {
    canvasWidth = $('#canvas-container').width();
    canvasHeight = $('#canvas-container').height();
    canvasWidthHalf = canvasWidth / 2;
    canvasHeightHalf = canvasHeight / 2;
    renderer.setClearColor(0xFFFFFF, 1);
    renderer.setSize(canvasWidth, canvasHeight);
    $('#canvas-container').append(renderer.domElement);
}

function initCamera() {
    camera.left = -canvasWidth / 2;
    camera.right = canvasWidth / 2;
    camera.top = canvasHeight / 2;
    camera.bottom = -canvasHeight / 2;
    camera.near = 0.1;
    camera.far = 1000;
    camera.position.z = 50;
    camera.updateProjectionMatrix();
}

function initScene() {
    // transactionManager.list.forEach(function (transaction) {
    //     scene.add(transaction);
    // }, this);
}

function initUser() {
    for (var i = 0; i < userNumber; i++) {
        var userData = {};
        userData.address = 'address';
        // test colors (5 users)
        if (i < 5) {
            userData.color = colorArray[i];
        } else {
            userData.color = '#CAE1FF';
        }
        userArray.push(userData);
    }

    userArray.forEach(function (user) {
        $('#user-area').append(
            '<div class="row">' +
            '<div class="col-sm-4 d-flex justify-content-center"><img class="img-fluid" style="background-color: ' + user.color + '" src="../images/ic_account_circle_white_24dp_2x.png"></div>' +
            '<div class="col-sm-8 d-flex align-items-center">' + user.address + '</div>' +
            '</div>'
        );
    }, this);
}

function initTransaction() {
    transactionManager = new TransactionManager(
        scene,
        canvasWidthHalf - canvasMargin - (transactionSize.x / 2),
        - canvasHeightHalf + canvasMargin + (transactionSize.y / 2),
        transactionSize,
        transactionDistance,
        transactionPendingColor,
        transactionMinedColor
    );

    // for (var i = 0; i < transactionNumber; i++) {
    //     transactionManager.addPendingTransaction();
    // }
}

function initBlock() {
    blockManager = new BlockManager(
        scene,
        0,
        - canvasHeightHalf + canvasMargin + (blockSize.y / 2),
        blockSize,
        blockDistance,
        lineColor,
        blockPadding,
        transactionDistance
    );
}

/**********************************************************************
 *
 * Events
 * 
 **********************************************************************/

function initEvent() {
    window.addEventListener('resize', onWindowResize, false);
    document.addEventListener('keydown', onDocumentKeyDown, false);
    document.getElementsByTagName('canvas')[0].addEventListener('mousedown', onDocumentMouseDown, false);
    document.getElementsByTagName('canvas')[0].addEventListener('mouseup', onDocumentMouseUp, false);
    document.getElementsByTagName('canvas')[0].addEventListener('mouseleave', onDocumentMouseLeave, false);
}

function onWindowResize() {
    canvasWidth = $('#canvas-container').width();
    canvasHeight = $('#canvas-container').height();
    canvasWidthHalf = canvasWidth / 2;
    canvasHeightHalf = canvasHeight / 2;

    camera.left = -canvasWidth / 2;
    camera.right = canvasWidth / 2;
    camera.top = canvasHeight / 2;
    camera.bottom = -canvasHeight / 2;
    camera.updateProjectionMatrix();

    renderer.setSize(canvasWidth, canvasHeight);

    // update mesh
}

// just for demo
var keyCount = 0;
function onDocumentKeyDown(event) {
    let keyCode = event.which;
    let block;
    let line;
    if (keyCode == 37) {
        // left
    } else if (keyCode == 39) {
        // right
        if (keyCount === 0) {
            let d = {
                color: 0xFF3030,
                name: 'block0',
                prev: null
            };
            let t = {
                name: 'transaction0'
            };
            transactionManager.add(t.name);
            blockManager.add(d);
        } else if (keyCount === 1) {
            let d = {
                color: 0xADFF2F,
                name: 'block1',
                prev: 'block0'
            };
            let t = {
                name: 'transaction1'
            };
            transactionManager.add(t.name);
            blockManager.add(d);
            transactionManager.setBlockHash('transaction0', 'block1');
            transactionManager.setPosition('transaction0', blockManager.getTransactionPosition('block1'));
        } else if (keyCount === 2) {
            let d = {
                color: 0xBF3EFF,
                name: 'block2',
                prev: 'block0'
            };
            blockManager.add(d);
        } else if (keyCount === 3) {
            let d = {
                color: 0x008B8B,
                name: 'block3',
                prev: 'block2'
            };
            blockManager.add(d);
        } else if (keyCount === 4) {
            let d = {
                color: 0xCDC1C5,
                name: 'block4',
                prev: 'block3'
            };
            blockManager.add(d);
        } else if (keyCount === 5) {
            let d = {
                color: 0xCDC1C5,
                name: 'block5',
                prev: 'block0'
            };
            blockManager.add(d);
        }

        keyCount++;
    }
};


function onDocumentMouseDown(event) {
    $(this).mousemove(onDocumentMouseMove);
};

function onDocumentMouseUp(event) {
    $(this).unbind('mousemove');
    previousMousePosition.set(-1, -1);
};

function onDocumentMouseLeave(event) {
    $(this).unbind('mousemove');
    previousMousePosition.set(-1, -1);
};

function onDocumentMouseMove(event) {
    event.preventDefault();
    var rect = renderer.domElement.getBoundingClientRect();
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;
    if (previousMousePosition.x !== -1 && previousMousePosition.y !== -1) {
        let distanceX = -(x - previousMousePosition.x);
        let distanceY = y - previousMousePosition.y;
        camera.position.set(camera.position.x + distanceX, camera.position.y + distanceY, camera.position.z);
        camera.updateProjectionMatrix();
    }
    previousMousePosition.x = x;
    previousMousePosition.y = y;
};

/**********************************************************************
 *
 * Update the scene
 * 
 **********************************************************************/

var clockCounter = 0;
function update() {
    // console.log(g / 60)
    // g++;
    // var object = scene.getObjectByName('transaction0');

    // transactionManager.list.forEach(function (newTransaction) {
    //     let oldTransaction = transactionManager.flindTransaction(newTransaction.name);
    //     if (oldTransaction.position !== newTransaction.position) {
    //         console.log('fdsfas')
    //     }
    // });
}

function animate() {
    requestAnimationFrame(animate);
    update();
    renderer.render(scene, camera);
}

$(document).ready(function () {
    initRenderer();
    initCamera();
    initUser();
    initTransaction();
    initBlock();
    initScene();
    initEvent();

    animate();
});