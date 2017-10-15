'use strict';

var scene = new THREE.Scene();
// var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
var camera = new THREE.PerspectiveCamera();
var renderer = new THREE.WebGLRenderer();

var geometry = new THREE.BoxGeometry(2, 2, 0);
var material = new THREE.MeshBasicMaterial({ color: 0xc3bfb5, transparent: true, opacity: 0.5 });
var cube = new THREE.Mesh(geometry, material);

var blockNumber = 5;


var transactionNumber = 10;




var userNumber = 5;



var texture = new THREE.ImageUtils.loadTexture('../images/ic_account_circle_white_24dp_2x.png');

function initRenderer() {
    renderer.setClearColor(0xffffff, 1);
    renderer.setSize($('#canvas-container').width(), $('#canvas-container').height());
    $('#canvas-container').append(renderer.domElement);
}

function initCamera() {
    camera.fov = 75;
    camera.aspect = $('#canvas-container').width() / $('#canvas-container').height();
    camera.near = 0.1;
    camera.far = 1000;
    camera.position.z = 10;
    camera.updateProjectionMatrix();
    // camera.position.set(0, 0, 100);
    // camera.lookAt(new THREE.Vector3(0, 0, 0));
}

function initScene() {
    // cube.position.x = 10;
    scene.add(cube);
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
    initScene();
    animate();
    console.log(camera);
});