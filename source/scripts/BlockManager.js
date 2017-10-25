'use strict';

class BlockManager {
    constructor(positionX, positionY, size, distance, lineColor) {
        this.list = [];
        this.initialPosition = { x: positionX, y: positionY };
        this.size = size; // THREE.Vector3
        this.distance = distance;
        this.lineColor = lineColor;
    }

    addBlock(data) {
        let blockGeometry = new THREE.BoxGeometry(this.size.x, this.size.y, this.size.z);
        let blockMaterial = new THREE.MeshBasicMaterial({
            color: data.color
            // transparent: true,
            // opacity: 0.5
        });
        let block = new THREE.Mesh(blockGeometry, blockMaterial);
        block.name = data.name; // hash
        // three points for connection between blocks
        block.topPoint = true;
        block.rightPoint = true;
        block.leftPoint = true;

        let lineGeometry = new THREE.Geometry();
        let lineMaterial = new THREE.LineBasicMaterial({ color: 0x000000 });

        if (this.number === 0) {
            block.position.set(this.initialPosition.x, this.initialPosition.y, 0);
            this.list.push(block);
        } else {
            let previousBlockPosition = this.getBlockPosition(data.prev);
            switch (this.getBlockFreePoint(data.prev)) {
                case 'top':
                    block.position.set(previousBlockPosition.x, previousBlockPosition.y + this.distance + this.size.y, 0);
                    this.list.push(block);
                    lineGeometry.vertices.push(this.getBlockTop(data.prev));
                    lineGeometry.vertices.push(this.getBlockBottom(data.name));
                    break;

                case 'right':
                    block.position.set(previousBlockPosition.x + this.distance + this.size.x, previousBlockPosition.y + this.distance + this.size.y, 0);
                    this.list.push(block);
                    lineGeometry.vertices.push(this.getBlockRight(data.prev));
                    lineGeometry.vertices.push(new THREE.Vector3(this.getBlockBottom(data.name).x, this.getBlockRight(data.prev).y, 0));
                    lineGeometry.vertices.push(this.getBlockBottom(data.name));
                    break;

                case 'left':
                    block.position.set(previousBlockPosition.x - this.distance - this.size.x, previousBlockPosition.y + this.distance + this.size.y, 0);
                    this.list.push(block);
                    lineGeometry.vertices.push(this.getBlockLeft(data.prev));
                    lineGeometry.vertices.push(new THREE.Vector3(this.getBlockBottom(data.name).x, this.getBlockLeft(data.prev).y, 0));
                    lineGeometry.vertices.push(this.getBlockBottom(data.name));
                    break;

                default:
                    break;
            }
        }

        let line = new THREE.Line(lineGeometry, lineMaterial);
        return [block, line];
    }

    get number() {
        return this.list.length;
    }

    flindBlock(blockName) {
        let block = this.list.find(function (element) {
            if (element.name === blockName) {
                return element;
            }
        });
        return block;
    }

    getBlockFreePoint(blockName) {
        let block = this.flindBlock(blockName);
        if (block.topPoint === true) {
            block.topPoint = false;
            return 'top';
        } else if (block.rightPoint === true) {
            block.rightPoint = false;
            return 'right';
        } else if (block.leftPoint === true) {
            block.leftPoint = false;
            return 'left';
        } else {
            // error for now
        }
    }

    getBlockPosition(blockName) {
        let block = this.flindBlock(blockName);
        return block.position;
    }

    getBlockTop(blockName) {
        let block = this.flindBlock(blockName);
        return new THREE.Vector3(block.position.x, block.position.y + (this.size.y / 2), 0);
    }

    getBlockBottom(blockName) {
        let block = this.flindBlock(blockName);
        return new THREE.Vector3(block.position.x, block.position.y - (this.size.y / 2), 0);
    }

    getBlockRight(blockName) {
        let block = this.flindBlock(blockName);
        return new THREE.Vector3(block.position.x + (this.size.x / 2), block.position.y, 0);
    }

    getBlockLeft(blockName) {
        let block = this.flindBlock(blockName);
        return new THREE.Vector3(block.position.x - (this.size.x / 2), block.position.y, 0);
    }
}