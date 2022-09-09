// GAME START
const startInput = document.querySelector('.welcome-input');
const startForm = document.querySelector('.welcome-name');
const playerName = document.querySelector('.player-name');
const compName = document.querySelector('.computer-name');
const welcomeMsg = document.querySelector('.welcome');
const gameText = document.querySelector('.gameplay-text');
const topText = document.querySelector('.top-text');
const textStart = 'Make your move . . .';

startForm.addEventListener('submit', (e) => {
    e.preventDefault();
    playerName.textContent = startInput.value;
    playerName.classList.remove('invisible'); 
    compName.classList.remove('invisible'); 
    welcomeMsg.classList.add('hide');
    playerName.value = '';
    window.setTimeout(() => {
        gameText.classList.remove('hide');
        topText.textContent = textStart;
    }, '1000');
});


// GAME PLAY

const gameBoard = document.querySelectorAll('.right-board > button');
const bottomText = document.querySelector('.bottom-text');
const rightText = document.createElement('span');
const replayBtn = document.querySelector('.replay-btn');
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

        // MISS/HIT:
        /*topText.textContent = textPlayer;
        window.setTimeout(() => {
            bottomText.textContent = textMiss;
        }, '1000');*/

        // SUNK:
        /*topText.textContent = textComputer;
        window.setTimeout(() => {
            bottomText.textContent = textHit;
            bottomText.appendChild(rightText);
            rightText.style.visibility = 'hidden';
            rightText.textContent = textSunkComp;
        }, '1000');
        window.setTimeout(() => {
            rightText.style.visibility = 'visible';
        }, '2000');*/

        // END GAME:
        /*topText.textContent = textWinTop;
        topText.classList.add('top-end');
        bottomText.textContent = textWinBottom;
        bottomText.classList.add('bottom-end');
        replayBtn.classList.remove('hide');*/
    });
});


// GAME END
