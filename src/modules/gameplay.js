const Player = require('../factories/Player');

const gameplay = (() => {

    let userPlayer;
    let computerPlayer;

    const gameBoard = document.querySelectorAll('.right-board > button');
    const topText = document.querySelector('.top-text');
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

    function beginGame(userName, computer) {

        userPlayer = new Player(userName);
        computerPlayer = new Player(computer);

        gameBoard.forEach(cell => {
            cell.addEventListener('click', () => {
        
                // MISS/HIT:
                topText.textContent = textPlayer;
                window.setTimeout(() => {
                    bottomText.textContent = textMiss;
                }, '1000');
        
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
    }

    return {
        beginGame
    };
})();

module.exports = gameplay;