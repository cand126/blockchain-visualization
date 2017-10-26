'use strict';

// TODO: Documentation
class TransactionManager {
    constructor(scene, positionX, positionY, size, distance, pColor, mColor) {
        this.scene= scene;
        this.list = [];
        this.initialPosition = { x: positionX, y: positionY };
        this.size = size; // THREE.Vector3
        this.distance = distance;
        this.pendingColor = pColor;
        this.minedColor = mColor;
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
        if (this.number == 0) {
            transaction.position.set(this.initialPosition.x, this.initialPosition.y, 1);
        } else {
            let lastPosition = this.getLastPosition();
            transaction.position.set(lastPosition.x, lastPosition.y + this.size.y + this.distance, 1);
        }
        this.list.push(transaction);
        this.scene.add(transaction);
    }

    setBlockHash(transactionName, parentName) {
        let transaction = this.flindTransaction(transactionName);
        transaction.blockHash = parentName;
    }

    setPosition(transactionName, position) {
        let transaction = this.flindTransaction(transactionName);
        transaction.position.set(position.x, position.y, 1);
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
}