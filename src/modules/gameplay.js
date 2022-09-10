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
        });

        computerPlayer.gameboard.board.forEach(cell => {
            if (cell.shipId !== null) {
                computerShips.push(computerPlayer.gameboard.board.indexOf(cell));
            }
        });

        userShips.forEach(item => {
            userBoard[item].setAttribute('id', 'player-ship');
        });

        computerShips.forEach(item => {
            computerBoard[item].classList.add('computer-ship');
        });

        computerBoard.forEach(cell => {
            if (!cell.hasAttribute('id')) {
                cell.addEventListener('click', userTurn);
            }
        });
    }

    function userTurn(e) {
        topText.textContent = textPlayer;

        const hitCell = e.target;

        if (!hitCell.classList.contains('computer-ship')) {
            window.setTimeout(() => {
                hitCell.setAttribute('id', 'hit');
            }, '100');
            window.setTimeout(() => {
                bottomText.textContent = textMiss;
            }, '1000');
            computerTurn();
        
        } else {
            const sunkStatus = checkIfSunk();

            if (!sunkStatus) {
                window.setTimeout(() => {
                    hitCell.setAttribute('id', 'player-ship');
                }, '100');
                window.setTimeout(() => {
                    bottomText.textContent = textHit;
                }, '1000');
                computerTurn();

            } else {
                const allSunk = checkAllSunk();

                if (!allSunk) {
                    window.setTimeout(() => {
                        hitCell.setAttribute('id', 'sunk');
                    }, '100');
                    window.setTimeout(() => {
                        bottomText.textContent = textHit;
                        bottomText.appendChild(rightText);
                        rightText.style.visibility = 'hidden';
                        rightText.textContent = textSunkComp;
                    }, '1000');
                    window.setTimeout(() => {
                        rightText.style.visibility = 'visible';
                    }, '1500');
                    computerTurn();
                }

            }
        }

        /*computerBoard.forEach(cell => {
                // END GAME:
                /*topText.textContent = textWinTop;
                topText.classList.add('top-end');
                bottomText.textContent = textWinBottom;
                bottomText.classList.add('bottom-end');
                replayBtn.classList.remove('hide');*/
            //});
        //});
    }

    function computerTurn() {
        computerBoard.forEach(cell => {
            cell.removeEventListener('click', userTurn);
        })
    }

    function checkIfSunk() {
        return false;
    }

    function checkAllSunk() {
        return false;
    }

    return {
        beginGame,
        userTurn,
        computerTurn,
        checkIfSunk,
        checkAllSunk
    };
})();

module.exports = gameplay;