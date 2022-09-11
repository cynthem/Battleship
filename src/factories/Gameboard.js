const Ship = require('./ship');

class Gameboard {
    constructor() {
        this.board = [];
        this.sunk = 0;
        this.carrier = new Ship('carrier', 5);
        this.battleship = new Ship('battleship', 4);
        this.cruiser = new Ship('cruiser', 3);
        this.submarine = new Ship('submarine', 3);
        this.destroyer = new Ship('destroyer', 2);
        this.init();
    }

    init() {
        for (let i = 0; i < 100; i++) {
            this.board.push({ cellId: i, shipId: 'none', isShot: false, isSunk: false, allSunk: false });
        }

        this.placeShips(this.carrier);
        this.placeShips(this.battleship);
        this.placeShips(this.cruiser);
        this.placeShips(this.submarine);
        this.placeShips(this.destroyer);
    }

    placeShips(shipName) {
        if (shipName === this.carrier) {
            const arr1 = [2, 12, 22];
            const starting1 = arr1[Math.floor(Math.random() * arr1.length)];
            const carrierLocation = [starting1, starting1 + 1, starting1 + 2, starting1 + 3, starting1 + 4];
            carrierLocation.forEach(cell => this.board[cell].shipId = 'carrier');
        } else if (shipName === this.battleship) {
            const arr2 = [8, 9, 18, 19, 28, 29, 38, 39, 48, 49, 58, 59, 68, 69];
            const starting2 = arr2[Math.floor(Math.random() * arr2.length)];
            const battleLocation = [starting2, starting2 + 10, starting2 + 20, starting2 + 30];
            battleLocation.forEach(cell => this.board[cell].shipId = 'battleship');
        } else if (shipName === this.cruiser) {
            const arr3 = [42, 43, 44, 52, 53, 54, 62, 63, 64];
            const starting3 = arr3[Math.floor(Math.random() * arr3.length)];
            const cruiserLocation = [starting3, starting3 + 1, starting3 + 2];
            cruiserLocation.forEach(cell => this.board[cell].shipId = 'cruiser');
        } else if (shipName === this.submarine) {
            const arr4 = [0, 10, 20, 30, 40, 50, 60, 70];
            const starting4 = arr4[Math.floor(Math.random() * arr4.length)];
            const subLocation = [starting4, starting4 + 10, starting4 + 20];
            subLocation.forEach(cell => this.board[cell].shipId = 'submarine');
        } else if (shipName === this.destroyer) {
            const arr5 = [82, 83, 84, 85, 92, 93, 94, 95];
            const starting5 = arr5[Math.floor(Math.random() * arr5.length)];
            const destroyLocation = [starting5, starting5 + 1];
            destroyLocation.forEach(cell => this.board[cell].shipId = 'destroyer');
        }
    }

    receiveAttack(index) {
        let status = this.board[index];
        status.isShot = true;
        
        if (status.shipId === 'none') {
            return status;

        } else if (status.shipId === 'carrier') {
            this.carrier.isHit(index);
            if (!this.carrier.isSunk()) {
                return status;
            } else {
                this.sunk++;
                status.isSunk = true;
                if (!this.allSunk()) {
                    return status;
                } else {
                    status.allSunk = true;
                    return status;
                }
            }

        } else if (status.shipId === 'battleship') {
            this.carrier.isHit(index);
            if (!this.carrier.isSunk()) {
                return status;
            } else {
                this.sunk++;
                status.isSunk = true;
                if (!this.allSunk()) {
                    return status;
                } else {
                    status.allSunk = true;
                    return status;
                }
            }

        } else if (status.shipId === 'cruiser') {
            this.carrier.isHit(index);
            if (!this.carrier.isSunk()) {
                return status;
            } else {
                this.sunk++;
                status.isSunk = true;
                if (!this.allSunk()) {
                    return status;
                } else {
                    status.allSunk = true;
                    return status;
                }
            }

        } else if (status.shipId === 'submarine') {
            this.carrier.isHit(index);
            if (!this.carrier.isSunk()) {
                return status;
            } else {
                this.sunk++;
                status.isSunk = true;
                if (!this.allSunk()) {
                    return status;
                } else {
                    status.allSunk = true;
                    return status;
                }
            }

        } else if (status.shipId === 'destroyer') {
            this.carrier.isHit(index);
            if (!this.carrier.isSunk()) {
                return status;
            } else {
                this.sunk++;
                status.isSunk = true;
                if (!this.allSunk()) {
                    return status;
                } else {
                    status.allSunk = true;
                    return status;
                }
            }
        }
    }

    allSunk() {
        return this.sunk === 5;
    }
}

module.exports = Gameboard;