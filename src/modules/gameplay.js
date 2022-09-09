const Player = require('../factories/Player');

const gameplay = (() => {

    let userPlayer;
    let computerPlayer;
    let userShips = [];
    let computerShips = [];

    const computerBoard = document.querySelectorAll('.right-board > button');
    const userBoard = document.querySelectorAll('.left-board > button');
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

        userPlayer.gameboard.board.forEach(cell => {
            if (cell.shipId !== null) {
                userShips.push(userPlayer.gameboard.board.indexOf(cell));
            }
        })

        computerPlayer.gameboard.board.forEach(cell => {
            if (cell.shipId !== null) {
                computerShips.push(computerPlayer.gameboard.board.indexOf(cell));
            }
        })

        userShips.forEach(item => {
            userBoard[item].setAttribute('id', 'player-ship');
        });

        computerShips.forEach(item => {
            computerBoard[item].classList.add('computer-ship');
        });

        userTurn();
    }

    function computerTurn() {}

    function userTurn() {
        computerBoard.forEach(cell => {

            if (!cell.hasAttribute('id')) {

                cell.addEventListener('click', () => {
                    topText.textContent = textPlayer;

                    if (!cell.classList.contains('computer-ship')) {
                        window.setTimeout(() => {
                            cell.setAttribute('id', 'hit');
                        }, '100');
                        window.setTimeout(() => {
                            bottomText.textContent = textMiss;
                        }, '1000');
                        computerTurn();
                    }
    
                });
            }
        });

        /*computerBoard.forEach(cell => {
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
            //});
        //});
    }

    return {
        beginGame,
        userTurn,
        computerTurn
    };
})();

module.exports = gameplay;