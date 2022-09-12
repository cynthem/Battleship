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
        const index = status.cellId;
        const match = this.availableCells.find(cell => cell === index);
        const matchIndex = this.availableCells.indexOf(match);
        this.availableCells.splice(matchIndex, 1);

        let randomPlay;

        if (status.shipId === 'none' || status.isSunk) {
            randomPlay = this.availableCells[Math.floor(Math.random() * this.availableCells.length)];
            return randomPlay; 

        } else {
            let choices = [];
            const choiceOne = index - 1;
            const choiceTwo = index + 1;
            const choiceThree = index + 10;
            const choiceFour = index - 10;

            if (index === 0 || index === 9) {
                if (this.availableCells.includes(choiceThree)) {
                    randomPlay = choiceThree;
                } else {
                    randomPlay = this.availableCells[Math.floor(Math.random() * this.availableCells.length)];
                }
                return randomPlay;

            } else if (index === 90 || index === 99) {
                if (this.availableCells.includes(choiceFour)) {
                    randomPlay = choiceFour;
                } else {
                    randomPlay = this.availableCells[Math.floor(Math.random() * this.availableCells.length)];
                }
                return randomPlay;

            } else if (index === 10 || index === 20 || index === 30 || index === 40 || index === 50 || index === 60 || index === 70 || index === 80 || index === 19 || index === 29 || index === 39 || index === 49 || index === 59 || index === 69 || index === 79 || index === 89 || index === 18 || index === 28 || index === 38 || index === 48 || index === 58 || index === 68 || index === 78 || index === 88) {
                if (this.availableCells.includes(choiceThree)) {
                    choices.push(choiceThree);
                }
                if (this.availableCells.includes(choiceFour)) {
                    choices.push(choiceFour);
                }
                if (choices.length < 1) {
                    randomPlay = this.availableCells[Math.floor(Math.random() * this.availableCells.length)];
                } else {
                    randomPlay = choices[Math.floor(Math.random() * choices.length)];
                }
                return randomPlay;

            } else if ((index >= 1 && index <= 8) || (index >= 91 && index <= 98)) {
                if (this.availableCells.includes(choiceOne)) {
                    choices.push(choiceOne);
                }
                if (this.availableCells.includes(choiceTwo)) {
                    choices.push(choiceTwo);
                }
                if (choices.length < 1) {
                    randomPlay = this.availableCells[Math.floor(Math.random() * this.availableCells.length)];
                } else {
                    randomPlay = choices[Math.floor(Math.random() * choices.length)];
                }
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
                if (choices.length < 1) {
                    randomPlay = this.availableCells[Math.floor(Math.random() * this.availableCells.length)];
                } else {
                    randomPlay = choices[Math.floor(Math.random() * choices.length)];
                }
                return randomPlay;
            }
        }
    }
}

module.exports = Computer;