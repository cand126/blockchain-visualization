'use strict';

class TransactionManager {
    constructor(positionX, positionY, size, distance, pColor, mColor) {
        this.list = [];
        this.initialPosition = { x: positionX, y: positionY };
        this.size = size; // THREE.Vector3
        this.distance = distance;
        this.pendingColor = pColor;
        this.minedColor = mColor;
    }

    addPendingTransaction() {
        let transactionGeometry = new THREE.BoxGeometry(this.size.x, this.size.y, this.size.z);
        let transactionMaterial = new THREE.MeshBasicMaterial({
            color: this.pendingColor
            // transparent: true,
            // opacity: 0.5
        });
        let transaction = new THREE.Mesh(transactionGeometry, transactionMaterial);
        transaction.name = 'transaction' + this.number; // hash
        if (this.number == 0) {
            transaction.position.set(this.initialPosition.x, this.initialPosition.y, 0);
        } else {
            let lastPosition = this.getLastTransactionPosition();
            transaction.position.set(lastPosition.x, lastPosition.y + this.size.y + this.distance, 0);
        }
        this.list.push(transaction);
    }

    get number() {
        return this.list.length;
    }

    getLastTransactionPosition() {
        let transaction = this.list[this.list.length - 1];
        return transaction.position;
    }
}