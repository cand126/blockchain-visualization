'use strict';

var scene = new THREE.Scene();
var camera = new THREE.OrthographicCamera();
var renderer = new THREE.WebGLRenderer();

// canvas size
var canvasWidth, canvasHeight;
var canvasWidthHalf, canvasHeightHalf;

// blocks
var blockNumber = 5;
var blockArray = [];
var blockGeometry = new THREE.BoxGeometry(90, 90, 0);
// var blockMaterial = new THREE.MeshBasicMaterial({
//     color: 0xFFFFFF,
//     transparent: true,
//     opacity: 0.5
// });
var blockColorArray = [
    0xFF3030,
    0xADFF2F,
    0xBF3EFF,
    0x008B8B,
    0xCDC1C5
];

// transactions
var transactionNumber = 7;
var transactionArray = [];
var transactionGeometry = new THREE.BoxGeometry(90, 15, 0);
var transactionMaterial = new THREE.MeshBasicMaterial({
    color: 0xc3bfb5,
    transparent: true,
    opacity: 0.5
});

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

var texture = new THREE.ImageUtils.loadTexture('../images/ic_account_circle_white_24dp_2x.png');

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
    transactionArray.forEach(function (transaction, index) {
        transaction.position.set(canvasWidthHalf - 60, -canvasHeightHalf + 30 + index * 40, 1);
        scene.add(transaction);
    }, this);
    blockArray.forEach(function (block, index) {
        block.position.set(0, -canvasHeightHalf + 60 + index * 120, 1);
        scene.add(block);
    }, this);
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
    for (var i = 0; i < transactionNumber; i++) {
        var transaction = new THREE.Mesh(transactionGeometry, transactionMaterial);
        transaction.name = 'transaction' + i;
        // console.log(transaction)
        transactionArray.push(transaction);
    }
}

function initBlock() {
    for (var i = 0; i < blockNumber; i++) {
        var block = new THREE.Mesh(blockGeometry, new THREE.MeshBasicMaterial({ color: blockColorArray[i] }));
        block.name = 'block' + i;
        blockArray.push(block);
    }
}

function initEvent() {
    window.addEventListener('resize', onWindowResize, false);
    document.addEventListener('keydown', onDocumentKeyDown, false);
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

function onDocumentKeyDown(event) {
    var keyCode = event.which;
    if (keyCode == 37) {
        // left
        console.log('left')
    } else if (keyCode == 39) {
        // right
        console.log('right')
    }
};

function update() {
    var object = scene.getObjectByName('transaction0');
    // object.position.x -= 1;
    // console.log(object)
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