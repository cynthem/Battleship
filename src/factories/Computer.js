class Computer {
    constructor() {
        this.availableCells = [];
        this.init();
    }

    init() {
        for (let i = 0; i < 100; i++) {
            this.availableCells.push(i);
        }
    }

    determinePlay(status) {
        // shipId: 'none', isShot: true, isSunk: false, allSunk: false
        // shipId: carrier, isShot: true, isSunk: false, allSunk: false
        // shipId: carrier, isShot: true, isSunk: true, allSunk: false
        // shipId: carrier, isShot: true, isSunk: true, allSunk: true
	    // status needs: gameboard.board index (matches index fired)


        const index = status.isShot;
        this.availableCells.splice(index, 1);
        let randomPlay = this.availableCells.indexOf(this.availableCells[Math.floor(Math.random() * this.availableCells.length)]);

        if (status.allSunk) {
            const endCode = 100;
            return endCode;
        } 

        if (!status.isShip || status.isSunk) {
            return randomPlay;
        }

        if (status.isShip) {
            let choices = [];
            const choiceOne = index - 1;
            const choiceTwo = index + 1;
            const choiceThree = index + 10;
            const choiceFour = index - 10;

            if (index >= 10 && index <= 89) {
                if (this.availableCells.includes(choiceOne)) {
                    choices.push(choiceOne);
                }
                if (this.availableCells.includes(choiceTwo)) {
                    choices.push(choiceTwo);
                }
                if (this.availableCells.includes(choiceThree)) {
                    choices.push(choiceThree);
                }
                if (this.availableCells.includes(choiceFour)) {
                    choices.push(choiceFour);
                }
                const nextMove = choices[Math.floor(Math.random() * choices.length)];
                return nextMove;

            } else if (index < 10 && index > 0) {
                if (this.availableCells.includes(choiceOne)) {
                    choices.push(choiceOne);
                }
                if (this.availableCells.includes(choiceTwo)) {
                    choices.push(choiceTwo);
                }
                if (this.availableCells.includes(choiceThree)) {
                    choices.push(choiceThree);
                }
                const nextMove = choices[Math.floor(Math.random() * choices.length)];
                return nextMove;

            } else if (index > 89 && index < 99) {
                if (this.availableCells.includes(choiceOne)) {
                    choices.push(choiceOne);
                }
                if (this.availableCells.includes(choiceTwo)) {
                    choices.push(choiceTwo);
                }
                if (this.availableCells.includes(choiceFour)) {
                    choices.push(choiceFour);
                }
                const nextMove = choices[Math.floor(Math.random() * choices.length)];
                return nextMove;

            } else if (index === 0) {
                if (this.availableCells.includes(choiceTwo)) {
                    choices.push(choiceTwo);
                }
                if (this.availableCells.includes(choiceThree)) {
                    choices.push(choiceThree);
                }
                const nextMove = choices[Math.floor(Math.random() * choices.length)];
                return nextMove;
            }
        }
    }
}

module.exports = Computer;