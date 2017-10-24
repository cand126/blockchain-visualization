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
// var blockColorArray = [
//     0xFF3030,
//     0xADFF2F,
//     0xBF3EFF,
//     0x008B8B,
//     0xCDC1C5
// ];
var blockData = [
    {
        color: 0xFF3030,
        position: [0, 0]
    },
    {
        color: 0xADFF2F,
        position: [-80, 120]
    },
    {
        color: 0xBF3EFF,
        position: [80, 120]
    },
    {
        color: 0x008B8B,
        position: [80, 240]
    },
    {
        color: 0xCDC1C5,
        position: [80, 360]
    }
];

var lineMaterial = new THREE.LineBasicMaterial({ color: 0x000000 });

var lineNumber = 4;
var lineData = [
    [
        [0, 45, 0],
        [-80, 75, 0]
    ],
    [
        [0, 45, 0],
        [80, 75, 0]
    ],
    [
        [80, 165, 0],
        [80, 195, 0]
    ],
    [
        [80, 285, 0],
        [80, 315, 0]
    ]
];
var lineArray = [];

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
        // block.position.set(0, -canvasHeightHalf + 60 + index * 120, 1);
        scene.add(block);
    }, this);
    lineArray.forEach(function (line, index) {
        scene.add(line);
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
        var data = blockData[i];
        var block = new THREE.Mesh(blockGeometry, new THREE.MeshBasicMaterial({ color: data.color }));
        block.name = 'block' + i;
        block.position.set(data.position[0], -canvasHeightHalf + 60 + data.position[1], 1);
        blockArray.push(block);
    }
}

function initLine() {
    for (var i = 0; i < lineNumber; i++) {
        var data = lineData[i];
        var lineGeometry = new THREE.Geometry();
        data.forEach(function (v) {
            lineGeometry.vertices.push(new THREE.Vector3(v[0], -canvasHeightHalf + 60 + v[1], v[2]));
        }, this);
        var line = new THREE.Line(lineGeometry, lineMaterial);
        line.name = 'line' + i;
        lineArray.push(line);
    }
}

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


function onDocumentMouseDown(event) {
    $(this).mousemove(onDocumentMouseMove);
};

function onDocumentMouseUp(event) {
    $(this).unbind('mousemove');
    mousePosition.set(-1, -1);
};

function onDocumentMouseLeave(event) {
    $(this).unbind('mousemove');
    mousePosition.set(-1, -1);
};

var mousePosition = new THREE.Vector2(-1, -1);
function onDocumentMouseMove(event) {
    event.preventDefault();
    var rect = renderer.domElement.getBoundingClientRect();
    // console.log(rect)
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;
    if (mousePosition.x !== -1 && mousePosition.y !== -1) {
        // console.log(x - mousePosition.x)
        // console.log(y - mousePosition.y)
        let distanceX = -(x - mousePosition.x);
        let distanceY = y - mousePosition.y;
        console.log(camera.position)
        camera.position.set(camera.position.x + distanceX, camera.position.y + distanceY, camera.position.z);
        camera.updateProjectionMatrix();
    }
    mousePosition.x = x;
    mousePosition.y = y;
    // console.log(mousePosition)
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
    initLine();
    initScene();
    initEvent();
    animate();
});