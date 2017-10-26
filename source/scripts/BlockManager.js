'use strict';

// TODO: Documentation
class BlockManager {
    constructor(scene, positionX, positionY, size, distance, lineColor, padding, transactionSize) {
        this.scene = scene;
        this.list = [];
        this.initialPosition = { x: positionX, y: positionY };
        this.size = size; // THREE.Vector3
        this.distance = distance;
        this.lineColor = lineColor;
        this.padding = padding;
        this.transactionSize = transactionSize;
    }

    add(data) {
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
        // the number of transactions that is held by now
        block.transactionNumber = 0;

        let lineGeometry = new THREE.Geometry();
        let lineMaterial = new THREE.LineBasicMaterial({ color: 0x000000 });

        if (this.number === 0) {
            block.position.set(this.initialPosition.x, this.initialPosition.y, 0);
            this.list.push(block);
        } else {
            let previousBlockPosition = this.getPosition(data.prev);
            switch (this.getFreePoint(data.prev)) {
                case 'top':
                    block.position.set(previousBlockPosition.x, previousBlockPosition.y + this.distance + this.size.y, 0);
                    this.list.push(block);
                    lineGeometry.vertices.push(this.getTop(data.prev));
                    lineGeometry.vertices.push(this.getBottom(data.name));
                    break;

                case 'right':
                    block.position.set(previousBlockPosition.x + this.distance + this.size.x, previousBlockPosition.y + this.distance + this.size.y, 0);
                    this.list.push(block);
                    lineGeometry.vertices.push(this.getRight(data.prev));
                    lineGeometry.vertices.push(new THREE.Vector3(this.getBottom(data.name).x, this.getRight(data.prev).y, 0));
                    lineGeometry.vertices.push(this.getBottom(data.name));
                    break;

                case 'left':
                    block.position.set(previousBlockPosition.x - this.distance - this.size.x, previousBlockPosition.y + this.distance + this.size.y, 0);
                    this.list.push(block);
                    lineGeometry.vertices.push(this.getLeft(data.prev));
                    lineGeometry.vertices.push(new THREE.Vector3(this.getBottom(data.name).x, this.getLeft(data.prev).y, 0));
                    lineGeometry.vertices.push(this.getBottom(data.name));
                    break;

                default:
                    // error
                    break;
            }
        }

        let line = new THREE.Line(lineGeometry, lineMaterial);
        this.scene.add(block);
        this.scene.add(line);
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

    getFreePoint(blockName) {
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

    getPosition(blockName) {
        let block = this.flindBlock(blockName);
        return block.position;
    }

    getTop(blockName) {
        let block = this.flindBlock(blockName);
        return new THREE.Vector3(block.position.x, block.position.y + (this.size.y / 2), 0);
    }

    getBottom(blockName) {
        let block = this.flindBlock(blockName);
        return new THREE.Vector3(block.position.x, block.position.y - (this.size.y / 2), 0);
    }

    getRight(blockName) {
        let block = this.flindBlock(blockName);
        return new THREE.Vector3(block.position.x + (this.size.x / 2), block.position.y, 0);
    }

    getLeft(blockName) {
        let block = this.flindBlock(blockName);
        return new THREE.Vector3(block.position.x - (this.size.x / 2), block.position.y, 0);
    }

    getTransactionPosition(blockName) {
        let block = this.flindBlock(blockName);
        let transactionPosition;
        switch (block.transactionNumber) {
            case 0:
                block.transactionNumber++;
                transactionPosition = new THREE.Vector3 (
                    block.position.x,
                    this.getTop(blockName).y - this.padding - (this.transactionSize.y * 0.5),
                    1
                );
                break;

            case 1:
                block.transactionNumber++;
                transactionPosition = new THREE.Vector3 (
                    block.position.x,
                    this.getTop(blockName).y - (this.padding * 2) - (this.transactionSize.y * 1.5),
                    1
                );
                break;

            case 2:
                block.transactionNumber++;
                transactionPosition = new THREE.Vector3 (
                    block.position.x,
                    this.getTop(blockName).y - (this.padding * 3) - (this.transactionSize.y * 2.5),
                    1
                );
                break;

            case 3:
                block.transactionNumber++;
                transactionPosition = new THREE.Vector3 (
                    block.position.x,
                    this.getTop(blockName).y - (this.padding * 4) - (this.transactionSize.y * 3.5),
                    1
                );
                break;

            default:
                // error
                break;
        }

        return transactionPosition;
    }
}