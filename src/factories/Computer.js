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
        const availableIndex = this.availableShots.indexOf(index);
        this.availableShots.splice(availableIndex, 1);
        let randomPlay = this.availableShots.indexOf(this.availableShots[Math.floor(Math.random() * this.availableShots.length)]);

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
                if (this.availableShots.includes(choiceOne)) {
                    choices.push(choiceOne);
                }
                if (this.availableShots.includes(choiceTwo)) {
                    choices.push(choiceTwo);
                }
                if (this.availableShots.includes(choiceThree)) {
                    choices.push(choiceThree);
                }
                if (this.availableShots.includes(choiceFour)) {
                    choices.push(choiceFour);
                }
                const nextMove = choices[Math.floor(Math.random() * choices.length)];
                return nextMove;

            } else if (index < 10 && index > 0) {
                if (this.availableShots.includes(choiceOne)) {
                    choices.push(choiceOne);
                }
                if (this.availableShots.includes(choiceTwo)) {
                    choices.push(choiceTwo);
                }
                if (this.availableShots.includes(choiceThree)) {
                    choices.push(choiceThree);
                }
                const nextMove = choices[Math.floor(Math.random() * choices.length)];
                return nextMove;

            } else if (index > 89 && index < 99) {
                if (this.availableShots.includes(choiceOne)) {
                    choices.push(choiceOne);
                }
                if (this.availableShots.includes(choiceTwo)) {
                    choices.push(choiceTwo);
                }
                if (this.availableShots.includes(choiceFour)) {
                    choices.push(choiceFour);
                }
                const nextMove = choices[Math.floor(Math.random() * choices.length)];
                return nextMove;

            } else if (index === 0) {
                if (this.availableShots.includes(choiceTwo)) {
                    choices.push(choiceTwo);
                }
                if (this.availableShots.includes(choiceThree)) {
                    choices.push(choiceThree);
                }
                const nextMove = choices[Math.floor(Math.random() * choices.length)];
                return nextMove;
            }
        }
    }
}

module.exports = Computer;