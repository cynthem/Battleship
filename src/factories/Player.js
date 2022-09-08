const Gameboard = require('./gameboard');

class Player {
    constructor(name) {
        this.name = name;
        this.gameboard = new Gameboard();
    }

    takeHit(index) {
        const status = this.gameboard.receiveAttack(index);

        if (!status.isShip) {
            return status;
        } else {
            if (!status.isSunk) {
                return status;
            } else {
                if (!this.gameboard.allSunk()) {
                    return status;
                } else {
                    status.allSunk = true;
                    return status;
                }
            }
        }
    }
}

module.exports = Player;