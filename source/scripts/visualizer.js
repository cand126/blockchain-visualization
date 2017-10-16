'use strict';

var scene = new THREE.Scene();
// var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
var camera = new THREE.OrthographicCamera();
var renderer = new THREE.WebGLRenderer();

var canvasWidth, canvasHeight;
var canvasWidthHalf, canvasHeightHalf;

// blocks
var blockGeometry = new THREE.BoxGeometry(2, 2, 0);
var material = new THREE.MeshBasicMaterial({
    color: 0xc3bfb5,
    transparent: true,
    opacity: 0.5
});
// var cube = new THREE.Mesh(geometry, material);

var blockNumber = 5;

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
    // camera.position.set(0, 0, 100);
    // camera.lookAt(new THREE.Vector3(0, 0, 0));
}

function initScene() {
    // cube.position.x = 10;
    // scene.add(cube);

    transactionArray.forEach(function (transaction, index) {
        transaction.position.set(canvasWidthHalf - 20, -canvasHeightHalf + 20 + index * 40, 1);
        scene.add(transaction);
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
        transactionArray.push(transaction);
    }
}

function initEvent() {
    window.addEventListener('resize', onWindowResize, false);
}

function onWindowResize() {
    canvasWidth = $('#canvas-container').width();
    canvasHeight = $('#canvas-container').height();
    canvasWidthHalf = canvasWidth / 2;
    canvasHeightHalf = canvasHeight / 2;

    // camera.aspect = canvasWidth / canvasHeight;
    camera.left = -canvasWidth / 2;
    camera.right = canvasWidth / 2;
    camera.top = canvasHeight / 2;
    camera.bottom = -canvasHeight / 2;
    camera.updateProjectionMatrix();

    renderer.setSize(canvasWidth, canvasHeight);
}

function update() {

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
    initScene();
    initEvent();
    animate();
});