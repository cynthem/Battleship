class Computer {
    constructor() {
        this.availableShots = [];
        this.init();
    }

    init() {
        for (let i = 0; i < 100; i++) {
            this.availableShots.push(i);
        }
    }

    determinePlay(status) {
        const index = status.isShot;
        
        let randomPlay = this.availableShots.indexOf(this.availableShots[Math.floor(Math.random() * this.availableShots.length)]);

        if (status.allSunk) {
            const endCode = 100;
            return endCode;
        } 

        if (!status.isShip || status.isSunk) {
            if (this.availableShots[randomPlay].isHit) {
                this.determinePlay({ isShot: index, isShip: false, isSunk: false, allSunk: false });
            } else {
                return randomPlay;
            }
        }

        if (status.isShip) {
            this.availableShots[index].hasShip = true;

            if (index >= 10 && index <= 89) {
                const choices = [index - 1, index + 1, index + 10, index - 10];
                const nextMove = choices[Math.floor(Math.random() * choices.length)];
                if (this.availableShots[nextMove].isHit) {
                    this.determinePlay({ isShot: index, isShip: true, isSunk: false, allSunk: false });
                } else {
                    return nextMove;
                }

            } else if (index < 10 && index > 0) {
                const choices = [index - 1, index + 1, index + 10];
                const nextMove = choices[Math.floor(Math.random() * choices.length)];
                if (this.availableShots[nextMove].isHit) {
                    this.determinePlay({ isShot: index, isShip: true, isSunk: false, allSunk: false });
                } else {
                    return nextMove;
                }

            } else if (index > 89 && index < 99) {
                const choices = [index - 1, index + 1, index - 10];
                const nextMove = choices[Math.floor(Math.random() * choices.length)];
                if (this.availableShots[nextMove].isHit) {
                    this.determinePlay({ isShot: index, isShip: true, isSunk: false, allSunk: false });
                } else {
                    return nextMove;
                }

            } else if (index === 0) {
                const choices = [1, 10];
                const nextMove = choices[Math.floor(Math.random() * choices.length)];
                if (this.availableShots[nextMove].isHit) {
                    this.determinePlay({ isShot: index, isShip: true, isSunk: false, allSunk: false });
                } else {
                    return nextMove;
                }
            }
        }
    }
}

module.exports = Computer;