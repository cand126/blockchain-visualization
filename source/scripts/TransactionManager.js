'use strict';

class TransactionManager {
    constructor(positionX, positionY, size, distance, pColor, mColor) {
        this.list = [];
        this.lastPosition = { x: positionX, y: positionY };
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
        transaction.position.set(this.lastPosition.x, this.lastPosition.y, 0);
        this.lastPosition.y += this.size.y + this.distance;
        this.list.push(transaction);
    }

    get number() {
        return this.list.length;
    }
}