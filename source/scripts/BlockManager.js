'use strict';

class BlockManager {
    constructor(positionX, positionY, size, distance) {
        this.list = [];
        this.initialPosition = { x: positionX, y: positionY };
        this.size = size; // THREE.Vector3
        this.distance = distance;
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
        if (this.number === 0) {
            block.position.set(this.initialPosition.x, this.initialPosition.y, 0);
        } else {
            let previousBlockPosition = this.getBlockPosition(data.prev);
            switch (this.getBlockFreePoint(data.prev)) {
                case 'top':
                    block.position.set(previousBlockPosition.x, previousBlockPosition.y + this.distance + this.size.y, 0);
                    break;

                case 'right':
                    block.position.set(previousBlockPosition.x + this.distance + this.size.x, previousBlockPosition.y + this.distance + this.size.y, 0);
                    break;

                case 'left':
                    block.position.set(previousBlockPosition.x - this.distance - this.size.x, previousBlockPosition.y + this.distance + this.size.y, 0);
                    break;

                default:
                    break;
            }
        }
        // three points for connection between blocks
        block.topPoint = true;
        block.rightPoint = true;
        block.leftPoint = true;
        this.list.push(block);

        return block;
    }

    get number() {
        return this.list.length;
    }

    getBlockFreePoint(blockName) {
        let block = this.list.find(function (element) {
            if (element.name === blockName) {
                return element;
            }
        });

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
        let block = this.list.find(function (element) {
            if (element.name === blockName) {
                return element;
            }
        });
        return block.position;
    }
}