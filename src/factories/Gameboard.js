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
            this.board.push({ shipId: null, isShot: false });
        }

        this.placeShips(this.carrier);
        this.placeShips(this.battleship);
        this.placeShips(this.cruiser);
        this.placeShips(this.submarine);
        this.placeShips(this.destroyer);
    }

    placeShips(shipName) {
        if (shipName === this.carrier) {
            const arr1 = [11, 12, 13, 21, 22, 23, 31, 32, 33];
            const starting1 = arr1[Math.floor(Math.random() * arr1.length)];
            const carrierLocation = [starting1, starting1 + 1, starting1 + 2, starting1 + 3, starting1 + 4];
            carrierLocation.forEach(cell => this.board[cell].shipId = 'carrier');
            return carrierLocation;
        } else if (shipName === this.battleship) {
            const arr2 = [8, 18, 28, 38, 48, 58, 68];
            const starting2 = arr2[Math.floor(Math.random() * arr2.length)];
            const battleLocation = [starting2, starting2 + 10, starting2 + 20, starting2 + 30];
            battleLocation.forEach(cell => this.board[cell].shipId = 'battleship');
            return battleLocation;
        } else if (shipName === this.cruiser) {
            const arr3 = [41, 42, 43, 44, 45, 51, 52, 53, 54, 55, 61, 62, 63, 64, 65];
            const starting3 = arr3[Math.floor(Math.random() * arr3.length)];
            const cruiserLocation = [starting3, starting3 + 1, starting3 + 2];
            cruiserLocation.forEach(cell => this.board[cell].shipId = 'cruiser');
            return cruiserLocation;
        } else if (shipName === this.submarine) {
            const arr4 = [0, 10, 20, 30, 40, 50, 60, 70];
            const starting4 = arr4[Math.floor(Math.random() * arr4.length)];
            const subLocation = [starting4, starting4 + 10, starting4 + 20];
            subLocation.forEach(cell => this.board[cell].shipId = 'submarine');
            return subLocation;
        } else if (shipName === this.destroyer) {
            const arr5 = [71, 72, 73, 74, 75, 76, 81, 82, 83, 84, 85, 86, 91, 92, 93, 94, 95, 96];
            const starting5 = arr5[Math.floor(Math.random() * arr5.length)];
            const destroyLocation = [starting5, starting5 + 1];
            destroyLocation.forEach(cell => this.board[cell].shipId = 'destroyer');
            return destroyLocation;
        }
    }

    receiveAttack(index) {
        this.board[index].isShot = true;

        let status = {
            isShot: null,
            isShip: false,
            isSunk: false, 
            allSunk: false
        };

        status.isShot = index;

        if (this.board[index].shipId === null) {
            return status;

        } else if (this.board[index].shipId === 'carrier') {
            this.carrier.isHit(index);
            status.isShip = true;
            if (this.carrier.isSunk()) {
                this.sunk += 5;
                status.isSunk = true;
                return status;
            } else {
                return status;
            }

        } else if (this.board[index].shipId === 'battleship') {
            this.battleship.isHit(index);
            status.isShip = true;
            if (this.battleship.isSunk()) {
                this.sunk += 4;
                status.isSunk = true;
                return status;
            } else {
                return status;
            }

        } else if (this.board[index].shipId === 'cruiser') {
            this.cruiser.isHit(index);
            status.isShip = true;
            if (this.cruiser.isSunk()) {
                this.sunk += 3;
                status.isSunk = true;
                return status;
            } else {
                return status;
            }
        } else if (this.board[index].shipId === 'submarine') {
            this.submarine.isHit(index);
            status.isShip = true;
            if (this.submarine.isSunk()) {
                this.sunk += 3;
                status.isSunk = true;
                return status;
            } else {
                return status;
            }
        } else if (this.board[index].shipId === 'destroyer') {
            this.destroyer.isHit(index);
            status.isShip = true;
            if (this.destroyer.isSunk()) {
                this.sunk += 2;
                status.isSunk = true;
                return status;
            } else {
                return status;
            }
        }
    }

    allSunk() {
        return this.sunk === 17;
    }
}

module.exports = Gameboard;