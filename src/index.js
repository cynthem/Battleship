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
const bottomText = document.querySelector('.bottom-text');
const rightText = document.createElement('span');
const textPlayer = 'You fire a shot into enemy waters . . .';
const textComputer = 'The enemy fires a shot into your waters . . .';
const textCompTurn = 'The enemy is taking aim . . .';
const textMiss = 'and it\'s a miss.';
const textHit = 'and it\'s a hit!';
const textSunkPlayer = ' You\'ve sunk their battleship.';
const textSunkComp = ' They\'ve sunk your battleship.';
const textWinTop = 'Congratulations, name.';
const textWinBottom = 'You\'re the winner!';
const textLoseTop = 'The enemy has won.';
const textLoseBottom = 'Better luck next time.';

gameBoard.forEach(cell => {
    cell.addEventListener('click', () => {
        /*topText.textContent = textComputer;
        bottomText.textContent = textHit;
        window.setTimeout(() => {
            bottomText.appendChild(rightText);
            rightText.textContent = textSunkComp;
        }, '1000');*/
        topText.textContent = textWinTop;
        bottomText.textContent = textWinBottom;
    });
});


// GAME END
