'use strict';

// TODO: Documentation
class TransactionManager {
    constructor(scene, positionX, positionY, size, distance, pColor, mColor, speed) {
        this.scene = scene;
        this.moveList = [];
        this.list = [];
        this.lastPosition = {
            x: positionX,
            y: positionY
        };
        this.size = size; // THREE.Vector3
        this.distance = distance;
        this.pendingColor = pColor;
        this.minedColor = mColor;
        this.speed = speed;
    }

    add(transactionName) {
        let transactionGeometry = new THREE.BoxGeometry(this.size.x, this.size.y, this.size.z);
        let transactionMaterial = new THREE.MeshBasicMaterial({
            color: this.pendingColor
            // transparent: true,
            // opacity: 0.5
        });
        let transaction = new THREE.Mesh(transactionGeometry, transactionMaterial);
        transaction.name = transactionName; // hash
        transaction.blockHash = null;
        transaction.position.set(this.lastPosition.x, this.lastPosition.y, 1);
        this.lastPosition.y += this.size.y + this.distance;
        this.list.push(transaction);
        this.scene.add(transaction);
    }

    setBlockHash(transactionName, blockName, blockPosition) {
        let transaction = this.flindTransaction(transactionName);
        transaction.blockHash = blockName;

        let data = {
            name: transactionName,
            position: blockPosition
        };
        this.moveList.push(data);

        this.lastPosition.y -= this.size.y + this.distance;
    }

    flindTransaction(transactionName) {
        let transaction = this.list.find(function (element) {
            if (element.name === transactionName) {
                return element;
            }
        });
        return transaction;
    }

    get number() {
        return this.list.length;
    }

    getLastPosition() {
        let transaction = this.list[this.list.length - 1];
        return transaction.position;
    }

    move() {
        for (let i = 0; i < this.moveList.length; i++) {
            let newTransaction = this.moveList[i];
            let oldTransaction = this.flindTransaction(newTransaction.name);

            if (oldTransaction.position.x !== newTransaction.position.x || oldTransaction.position.y !== newTransaction.position.y) {
                if (Math.abs(oldTransaction.position.x - newTransaction.position.x) > this.speed) {
                    if (oldTransaction.position.x < newTransaction.position.x) {
                        oldTransaction.position.x += this.speed;
                    } else if (oldTransaction.position.x > newTransaction.position.x) {
                        oldTransaction.position.x -= this.speed;
                    }
                } else {
                    oldTransaction.position.set(newTransaction.position.x, oldTransaction.position.y, 1);
                }

                if (Math.abs(oldTransaction.position.y - newTransaction.position.y) > this.speed) {
                    if (oldTransaction.position.y < newTransaction.position.y) {
                        oldTransaction.position.y += this.speed;
                    } else if (oldTransaction.position.x > newTransaction.position.y) {
                        oldTransaction.position.y -= this.speed;
                    }
                } else {
                    oldTransaction.position.set(oldTransaction.position.x, newTransaction.position.y, 1);
                }
            } else {
                this.moveList.splice(i, 1);
            }
        }
    }
}