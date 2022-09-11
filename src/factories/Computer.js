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
        /*if (status.allSunk) {
            return status;
        }*/

        const index = status.cellId;
        const match = this.availableCells.find(cell => cell === index);
        const matchIndex = this.availableCells.indexOf(match);
        this.availableCells.splice(matchIndex, 1);

        let randomPlay = this.availableCells[Math.floor(Math.random() * this.availableCells.length)];

        if (status.shipId === 'none' || status.isSunk) {
           return randomPlay; 

        } else {
            let choices = [];
            const choiceOne = index - 1;
            const choiceTwo = index + 1;
            const choiceThree = index + 10;
            const choiceFour = index - 10;

            if (index === 0) {
                return 10;

            } else if (index === 9) {
                return 19;

            } else if (index === 90) {
                return 80;

            } else if (index === 99) {
                return 89;

            } else if (index === 10 || index === 20 || index === 30 || index === 40 || index === 50 || index === 60 || index === 70 || index === 80 || index === 19 || index === 29 || index === 39 || index === 49 || index === 59 || index === 69 || index === 79 || index === 89) {
                if (this.availableCells.includes(choiceThree)) {
                    choices.push(choiceThree);
                }
                if (this.availableCells.includes(choiceFour)) {
                    choices.push(choiceFour);
                }
                randomPlay = choices[Math.floor(Math.random() * choices.length)];
                return randomPlay;

            } else if (index >= 1 && index <= 8) {
                if (this.availableCells.includes(choiceOne)) {
                    choices.push(choiceOne);
                }
                if (this.availableCells.includes(choiceTwo)) {
                    choices.push(choiceTwo);
                }
                if (this.availableCells.includes(choiceThree)) {
                    choices.push(choiceThree);
                }
                randomPlay = choices[Math.floor(Math.random() * choices.length)];
                return randomPlay;

            } else if (index >= 91 && index <= 98) {
                if (this.availableCells.includes(choiceOne)) {
                    choices.push(choiceOne);
                }
                if (this.availableCells.includes(choiceTwo)) {
                    choices.push(choiceTwo);
                }
                if (this.availableCells.includes(choiceFour)) {
                    choices.push(choiceFour);
                }
                randomPlay = choices[Math.floor(Math.random() * choices.length)];
                return randomPlay;

            } else {
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
                randomPlay = choices[Math.floor(Math.random() * choices.length)];
                return randomPlay;
            }
        }
    }
}

module.exports = Computer;