'use strict';

class BlockManager {
    constructor(positionX, positionY, size, distance) {
        this.list = [];
        this.initialPosition = { x: positionX, y: positionY };
        this.size = size; // THREE.Vector3
        this.distance = distance;
    }
    // TODO: fork
    addBlock(color) {
        let blockGeometry = new THREE.BoxGeometry(80, 80, 0);
        let blockMaterial = new THREE.MeshBasicMaterial({
            color: color
            // transparent: true,
            // opacity: 0.5
        });
        let block = new THREE.Mesh(blockGeometry, blockMaterial);
        block.name = 'block' + this.number; // hash
        if (this.number === 0) {
            block.position.set(this.initialPosition.x, this.initialPosition.y, 0);
        } else {
            block.position.set(this.getLastBlockPosition().x, this.getLastBlockPosition().y + this.distance + this.size.y, 0);
        }
        this.list.push(block);
    }

    get number() {
        return this.list.length;
    }

    getLastBlockPosition() {
        let block = this.list[this.list.length - 1];
        return block.position;
    }
}