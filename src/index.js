/*const gameplay = require('./modules/gameplay');

const startInput = document.querySelector('.welcome-input');
const startForm = document.querySelector('.welcome-name');
const playerName = document.querySelector('.player-name');
const compName = document.querySelector('.computer-name');
const welcomeMsg = document.querySelector('.welcome');
const gameText = document.querySelector('.gameplay-text');

startForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const inputName = startInput.value;
    playerName.textContent = inputName;
    playerName.classList.remove('invisible'); 
    compName.classList.remove('invisible'); 
    welcomeMsg.classList.add('hide');
    playerName.value = '';
    window.setTimeout(() => {
        gameText.classList.remove('hide');
        gameplay.beginGame(inputName, 'computer');
    }, '1000');
});*/



class Computer {
    constructor() {this.availableCells = [];
        this.init();}
    init() {for (let i = 0; i < 100; i++) {this.availableCells.push(i);}}

    determinePlay(status) {
        const index = status.cellId;
        const match = this.availableCells.find(cell => cell === index);
        const matchIndex = this.availableCells.indexOf(match);
        this.availableCells.splice(matchIndex, 1);

        console.log('available cells:')
        console.log(this.availableCells)

        let randomPlay = this.availableCells[Math.floor(Math.random() * this.availableCells.length)];
        
        if (status.shipId === 'none' || status.isSunk) {
           status.nextMove = randomPlay;
           return status; 
        } else {
            let choices = [];
            const choiceOne = index - 1;
            const choiceTwo = index + 1;
            const choiceThree = index + 10;
            const choiceFour = index - 10;
            if (index === 0) {
                if (this.availableCells.includes(choiceTwo)) {
                    choices.push(choiceTwo);
                }
                if (this.availableCells.includes(choiceThree)) {
                    choices.push(choiceThree);
                }
                console.log('choices array:')
                console.log(choices)
                randomPlay = choices[Math.floor(Math.random() * choices.length)];
                console.log('random play:')
                console.log(randomPlay)
                status.nextMove = randomPlay;
                return status;

            } else if (index === 10 || index === 20 || index === 30 || index === 40 || index === 50 || index === 60 || index === 70 || index === 80 || index === 19 || index === 29 || index === 39 || index === 49 || index === 59 || index === 69 || index === 79 || index === 89) {
                if (this.availableCells.includes(choiceThree)) {
                    choices.push(choiceThree);
                }
                if (this.availableCells.includes(choiceFour)) {
                    choices.push(choiceFour);
                }
                randomPlay = choices[Math.floor(Math.random() * choices.length)];
                status.nextMove = randomPlay;
                return status;

            } else if (index === 9) {
                if (this.availableCells.includes(choiceOne)) {
                    choices.push(choiceOne);
                }
                if (this.availableCells.includes(choiceThree)) {
                    choices.push(choiceThree);
                }
                randomPlay = choices[Math.floor(Math.random() * choices.length)];
                status.nextMove = randomPlay;
                return status;

            } else if (index === 90) {
                if (this.availableCells.includes(choiceTwo)) {
                    choices.push(choiceTwo);
                }
                if (this.availableCells.includes(choiceFour)) {
                    choices.push(choiceFour);
                }
                randomPlay = choices[Math.floor(Math.random() * choices.length)];
                status.nextMove = randomPlay;
                return status;
            } 
        }
    }
}

const newPuter = new Computer();
newPuter.determinePlay({cellId: 1, shipId: 'carrier', isSunk: true, allSunk: false})
newPuter.determinePlay({cellId: 4, shipId: 'none', isSunk: false, allSunk: false})
newPuter.determinePlay({cellId: 0, shipId: 'carrier', isSunk: false, allSunk: false})