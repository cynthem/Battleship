const Player = require('../factories/Player');
const Computer = require('../factories/Computer');

const gameplay = (() => {

    let userPlayer;
    let computerPlayer;
    let randomizeMove;
    let nextMove;
    let playerStatus;
    let computerStatus;
    let playerName = '';

    const computerBoard = document.querySelectorAll('.right-board > button');
    const userBoard = document.querySelectorAll('.left-board > button');
    const topText = document.querySelector('.top-text');
    const bottomText = document.querySelector('.bottom-text');
    const rightText = document.createElement('span');
    const replayBtn = document.querySelector('.replay-btn');
    const textPlayer = 'You fire a shot into enemy waters . . .';
    const textComputer = 'The enemy fires a shot . . .';
    const textCompTurn = 'The enemy is taking aim . . .';
    const textMiss = 'and it\'s a miss.';
    const textHit = 'and it\'s a hit!';
    const textSunkPlayer = ' You\'ve sunk their';
    const textSunkComp = ' They\'ve sunk your';
    const textWinTop = `Congratulations, ${playerName}.`;
    const textWinBottom = 'You\'re the winner!';
    const textLoseTop = 'The enemy has won.';
    const textLoseBottom = 'Better luck next time.';

    function beginGame(userName, computerName) {
        playerName = userName;

        userPlayer = new Player(userName);
        computerPlayer = new Player(computerName);

        randomizeMove = new Computer();
        nextMove = Math.floor(Math.random() * 100);
        playerStatus = userPlayer.takeHit(nextMove);

        userPlayer.gameboard.board.forEach(cell => {
            if (cell.shipId !== 'none') {
                userBoard[cell.cellId].setAttribute('id', 'player-ship');
            }
        });

        computerPlayer.gameboard.board.forEach(cell => {
            if (cell.shipId !== 'none') {
                computerBoard[cell.cellId].classList.add('computer-ship');
            }
        });

        computerBoard.forEach(cell => {
            if (!cell.hasAttribute('id')) {
                cell.style.cursor = 'pointer';
                cell.addEventListener('click', userTurn);
            }
        });
    }

    function userTurn(e) {
        topText.textContent = '';
        bottomText.textContent = '';

        const hitCell = e.target;
        const hitIndex = [...hitCell.parentElement.children].indexOf(hitCell);

        computerStatus = computerPlayer.takeHit(hitIndex);

        if (computerStatus.shipId === 'none') {
            topText.textContent = textPlayer;
            window.setTimeout(() => {
                hitCell.setAttribute('id', 'hit');
            }, '100');
            window.setTimeout(() => {
                bottomText.textContent = textMiss;
                computerTurn();
            }, '1000');

        } else {
            if (!computerStatus.isSunk) {
                topText.textContent = textPlayer;
                window.setTimeout(() => {
                    hitCell.setAttribute('id', 'player-ship');
                }, '100');
                window.setTimeout(() => {
                    bottomText.textContent = textHit;
                    computerTurn();
                }, '1000');

            } else {
                const shipType = computerStatus.shipId;

                if (!computerStatus.allSunk) {
                    topText.textContent = textPlayer;
                    window.setTimeout(() => {
                        hitCell.setAttribute('id', 'sunk');
                    }, '100');
                    window.setTimeout(() => {
                        bottomText.textContent = textHit;
                        rightText.style.visibility = 'hidden';
                        rightText.textContent = `${textSunkPlayer} ${shipType}.`;
                        bottomText.appendChild(rightText);
                    }, '1000');
                    window.setTimeout(() => {
                        markSunkShip(shipType);
                        rightText.style.visibility = 'visible';
                    }, '1500');
                    window.setTimeout(() => {
                        computerTurn();
                    }, '1600');

                } else {
                    topText.textContent = textPlayer;
                    window.setTimeout(() => {
                        hitCell.setAttribute('id', 'sunk');
                    }, '100');
                    window.setTimeout(() => {
                        bottomText.textContent = textHit;
                        rightText.style.visibility = 'hidden';
                        rightText.textContent = `${textSunkPlayer} ${shipType}.`;
                        bottomText.appendChild(rightText);
                    }, '1000');
                    window.setTimeout(() => {
                        markSunkShip(shipType);
                        rightText.style.visibility = 'visible';
                    }, '1500');
                    window.setTimeout(() => {
                        topText.textContent = '';
                        bottomText.textContent = '';
                        //bottomText.removeChild(rightText);
                        replayBtn.classList.remove('hide');
                        replayBtn.style.visibility = 'hidden';
                        topText.classList.add('top-end');
                        topText.textContent = textWinTop;
                    }, '2500');
                    window.setTimeout(() => {
                        bottomText.classList.add('bottom-end');
                        bottomText.textContent = textWinBottom;
                    }, '3000');
                    window.setTimeout(() => {
                        replayBtn.style.visibility = 'visible';
                        replayBtn.addEventListener('click', resetGame);
                    }, '3500');
                }
            }
        }
    }

    function computerTurn() {
        computerBoard.forEach(cell => {
            cell.style.cursor = 'none';
            cell.removeEventListener('click', userTurn);
        });

        window.setTimeout(() => {
            topText.textContent = textCompTurn;
            bottomText.textContent = '';
        }, '2000');

        window.setTimeout(() => {
            topText.textContent = textComputer;
        }, '3500');

        if (playerStatus.shipId === 'none') {
            window.setTimeout(() => {
                userBoard[nextMove].setAttribute('id', 'hit');
            }, '4500');
            window.setTimeout(() => {
                bottomText.textContent = textMiss;
                nextMove = randomizeMove.determinePlay(playerStatus);
                playerStatus = userPlayer.takeHit(nextMove);
                computerBoard.forEach(cell => {
                    if (!cell.hasAttribute('id')) {
                        cell.style.cursor = 'pointer';
                        cell.addEventListener('click', userTurn);
                    }
                });
            }, '5000');
        
        } else {
            if (!playerStatus.isSunk) {
                window.setTimeout(() => {
                    userBoard[nextMove].setAttribute('id', 'player-hit');
                }, '4500');
                window.setTimeout(() => {
                    bottomText.textContent = textHit;
                    nextMove = randomizeMove.determinePlay(playerStatus);
                    playerStatus = userPlayer.takeHit(nextMove);
                    computerBoard.forEach(cell => {
                        if (!cell.hasAttribute('id')) {
                            cell.style.cursor = 'pointer';
                            cell.addEventListener('click', userTurn);
                        }
                    });
                }, '5000');

            } else {
                const shipType = playerStatus.shipId;

                if (!playerStatus.allSunk) {
                    window.setTimeout(() => {
                        userBoard[nextMove].setAttribute('id', 'player-hit');
                    }, '4500');
                    window.setTimeout(() => {
                        bottomText.textContent = textHit;
                        rightText.style.visibility = 'hidden';
                        rightText.textContent = `${textSunkComp} ${shipType}.`;
                        bottomText.appendChild(rightText);
                    }, '5000');
                    window.setTimeout(() => {
                        markPlayerSunk(shipType);
                        rightText.style.visibility = 'visible';
                        nextMove = randomizeMove.determinePlay(playerStatus);
                        playerStatus = userPlayer.takeHit(nextMove);
                        computerBoard.forEach(cell => {
                            if (!cell.hasAttribute('id')) {
                                cell.style.cursor = 'pointer';
                                cell.addEventListener('click', userTurn);
                            }
                        });
                    }, '5500');

                } else {
                    window.setTimeout(() => {
                        userBoard[nextMove].setAttribute('id', 'player-hit');
                    }, '4500');
                    window.setTimeout(() => {
                        bottomText.textContent = textHit;
                        rightText.style.visibility = 'hidden';
                        rightText.textContent = `${textSunkComp} ${shipType}.`;
                        bottomText.appendChild(rightText);
                    }, '5000');
                    window.setTimeout(() => {
                        markPlayerSunk(shipType);
                        rightText.style.visibility = 'visible';
                    }, '5500');
                    window.setTimeout(() => {
                        topText.textContent = '';
                        bottomText.textContent = '';
                        //bottomText.removeChild(rightText);
                        replayBtn.classList.remove('hide');
                        replayBtn.style.visibility = 'hidden';
                        topText.classList.add('top-end');
                        topText.textContent = textLoseTop;
                    }, '6500');
                    window.setTimeout(() => {
                        bottomText.classList.add('bottom-end');
                        bottomText.textContent = textLoseBottom;
                    }, '7000');
                    window.setTimeout(() => {
                        replayBtn.style.visibility = 'visible';
                        replayBtn.addEventListener('click', resetGame);
                    }, '7500');
                }
            }
        }
    }

    function markSunkShip(shipType) {
        computerPlayer.gameboard.board.forEach(cell => {
            if (cell.shipId === shipType) {
                computerBoard[cell.cellId].setAttribute('id', 'sunk');
            }
        });
    }

    function markPlayerSunk(shipType) {
        userPlayer.gameboard.board.forEach(cell => {
            if (cell.shipId === shipType) {
                userBoard[cell.cellId].setAttribute('id', 'sunk');
            }
        });
    }

    function resetGame() {
        window.location.reload(true);
    }

    return {
        beginGame,
        userTurn,
        computerTurn,
        markSunkShip,
        markPlayerSunk,
        resetGame
    };
})();

module.exports = gameplay;