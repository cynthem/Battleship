// GAME START
const startInput = document.querySelector('.welcome-input');
const startBtn = document.querySelector('.welcome-btn');
const playerName = document.querySelector('.player-name');
const compName = document.querySelector('.computer-name');
const welcomeMsg = document.querySelector('.welcome');
const gameText = document.querySelector('.gameplay-text');
const topText = document.querySelector('.top-text');
const textStart = 'Make your move . . .';

startBtn.addEventListener('click', (e) => {
    e.preventDefault();
    playerName.textContent = startInput.value;
    playerName.classList.remove('invisible'); 
    compName.classList.remove('invisible'); 
    welcomeMsg.classList.add('hide');
    playerName.value = '';
    gameText.classList.remove('hide');
    topText.textContent = textStart;
});


// GAME PLAY

const gameBoard = document.querySelectorAll('.right-board > button');
const bottomText
const textPlayer = 'You fire a shot into enemy waters . . .';
const textComputer = 'The enemy fires a shot into your waters . . .';
const textCompTurn = 'The enemy is taking aim . . .';
const textMiss = 'and it\'s a miss.';
const textHit = 'and it\'s a hit!';
const textSunkPlayer = 'You\'ve sunk their battleship.';
const textSunkComp = 'They\'ve sunk your battleship.';
const textWin = 'Congratulations, name. You\'re the winner!';
const textLose = 'The enemy has won. Better luck next time.';

gameBoard.forEach(cell => {
    cell.addEventListener('click', () => {
        gameText.textContent = textPlayer;
    });
});


// GAME END
