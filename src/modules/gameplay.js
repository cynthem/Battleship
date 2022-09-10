const Player = require('../factories/Player');
const Computer = require('../factories/Computer');

const gameplay = (() => {

    let userPlayer;
    let computerPlayer;
    let computerMove;
    let nextMove;
    let turnResult = {};
    let userShips = [];
    let computerShips = [];
    let hitShips = [{carrier: 5}, {battle: 4}, {cruiser: 3}, {sub: 3}, {destroy: 2}];
    let totalSunk = 0;
    let allSunk = false;

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
    const textSunkPlayer = ' You\'ve sunk their';
    const textSunkComp = ' They\'ve sunk your';
    const textWinTop = 'Congratulations, name.';
    const textWinBottom = 'You\'re the winner!';
    const textLoseTop = 'The enemy has won.';
    const textLoseBottom = 'Better luck next time.';

    function beginGame(userName, computer) {
        computerMove = new Computer();
        userPlayer = new Player(userName);
        computerPlayer = new Player(computer);

        nextMove = Math.floor(Math.random() * 100);
        turnResult = userPlayer.takeHit(nextMove);
        console.log(`first move: ${nextMove}`)
        console.log(turnResult)

        userPlayer.gameboard.board.forEach(cell => {
            if (cell.shipId !== null) {
                userShips.push(userPlayer.gameboard.board.indexOf(cell));
            }
        });

        computerPlayer.gameboard.board.forEach(cell => {
            if (cell.shipId !== null) {
                const shipInfo = {
                    shipName: cell.shipId,
                    shipIndex: computerPlayer.gameboard.board.indexOf(cell)
                };
                computerShips.push(shipInfo);
            }
        });

        userShips.forEach(item => {
            userBoard[item].setAttribute('id', 'player-ship');
        });

        computerShips.forEach(item => {
            computerBoard[item.shipIndex].classList.add('computer-ship');
        });

        computerBoard.forEach(cell => {
            if (!cell.hasAttribute('id')) {
                cell.addEventListener('click', userTurn);
            }
        });
    }

    function userTurn(e) {
        const hitCell = e.target;

        bottomText.textContent = '';

        if (!hitCell.classList.contains('computer-ship')) {
            topText.textContent = textPlayer;
            window.setTimeout(() => {
                hitCell.setAttribute('id', 'hit');
            }, '100');
            window.setTimeout(() => {
                bottomText.textContent = textMiss;
                computerTurn();
            }, '1000');
        
        } else {
            const hitIndex = [...hitCell.parentElement.children].indexOf(hitCell);
            const shipType = recordHit(hitIndex);
            const sunkStatus = checkIfSunk(shipType);

            if (!sunkStatus) {
                topText.textContent = textPlayer;
                window.setTimeout(() => {
                    hitCell.setAttribute('id', 'player-ship');
                }, '100');
                window.setTimeout(() => {
                    bottomText.textContent = textHit;
                    computerTurn();
                }, '1000');

            } else {
                recordSink(1);
                const allSunk = checkAllSunk();

                if (!allSunk) {
                    topText.textContent = textPlayer;
                    window.setTimeout(() => {
                        hitCell.setAttribute('id', 'sunk');
                    }, '100');
                    window.setTimeout(() => {
                        bottomText.textContent = textHit;
                        bottomText.appendChild(rightText);
                        rightText.style.visibility = 'hidden';
                        rightText.textContent = `${textSunkPlayer} ${shipType}.`;
                    }, '1000');
                    window.setTimeout(() => {
                        markSunkShip(shipType);
                        rightText.style.visibility = 'visible';
                        computerTurn();
                    }, '1500');

                } else {
                    topText.textContent = textPlayer;
                    window.setTimeout(() => {
                        hitCell.setAttribute('id', 'sunk');
                    }, '100');
                    window.setTimeout(() => {
                        bottomText.textContent = textHit;
                        bottomText.appendChild(rightText);
                        rightText.style.visibility = 'hidden';
                        rightText.textContent = `${textSunkPlayer} ${shipType}.`;
                    }, '1000');
                    window.setTimeout(() => {
                        markSunkShip(shipType);
                        rightText.style.visibility = 'visible';
                        computerTurn();
                    }, '1500');
                    window.setTimeout(() => {
                        topText.textContent = textWinTop;
                        topText.classList.add('top-end');
                    }, '2500');
                    window.setTimeout(() => {
                        bottomText.textContent = textWinBottom;
                        bottomText.classList.add('bottom-end');
                        replayBtn.classList.remove('hide');
                        replayBtn.style.visibility = 'hidden';
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
            cell.removeEventListener('click', userTurn);
        });

        window.setTimeout(() => {
            topText.textContent = textCompTurn;
            bottomText.textContent = '';
        }, '2000');

        window.setTimeout(() => {
            topText.textContent = textComputer;
        }, '4000');

        if (!turnResult.isShip) {
            window.setTimeout(() => {
                userBoard[nextMove].setAttribute('id', 'hit');
            }, '5000');
            window.setTimeout(() => {
                nextMove = computerMove.determinePlay(turnResult);
                turnResult = userPlayer.takeHit(nextMove);
                bottomText.textContent = textMiss;
                computerBoard.forEach(cell => {
                    if (!cell.hasAttribute('id')) {
                        cell.addEventListener('click', userTurn);
                    }
                });
            }, '5500');
        
        } else {
            if (!turnResult.isSunk) {
                window.setTimeout(() => {
                    userBoard[nextMove].setAttribute('id', 'player-hit');
                }, '5000');
                window.setTimeout(() => {
                    nextMove = computerMove.determinePlay(turnResult);
                    turnResult = userPlayer.takeHit(nextMove);
                    bottomText.textContent = textHit;
                    computerBoard.forEach(cell => {
                        if (!cell.hasAttribute('id')) {
                            cell.addEventListener('click', userTurn);
                        }
                    });
                }, '5500');

            } else {
                const sunkShip = userPlayer.gameboard.board[firstMove].shipId;

                if (!turnResult.allSunk) {
                    window.setTimeout(() => {
                        userBoard[nextMove].setAttribute('id', 'player-hit');
                    }, '5000');
                    window.setTimeout(() => {
                        bottomText.textContent = textHit;
                        bottomText.appendChild(rightText);
                        rightText.style.visibility = 'hidden';
                        rightText.textContent = `${textSunkComp} ${sunkShip}.`;
                    }, '5500');
                    window.setTimeout(() => {
                        markPlayerSunk(sunkShip);
                        rightText.style.visibility = 'visible';
                        nextMove = computerMove.determinePlay(turnResult);
                        turnResult = userPlayer.takeHit(nextMove);
                        computerBoard.forEach(cell => {
                            if (!cell.hasAttribute('id')) {
                                cell.addEventListener('click', userTurn);
                            }
                        });
                    }, '6000');

                } else {
                    window.setTimeout(() => {
                        userBoard[nextMove].setAttribute('id', 'player-hit');
                    }, '5000');
                    window.setTimeout(() => {
                        bottomText.textContent = textHit;
                        bottomText.appendChild(rightText);
                        rightText.style.visibility = 'hidden';
                        rightText.textContent = `${textSunkComp} ${sunkShip}.`;
                    }, '5500');
                    window.setTimeout(() => {
                        markPlayerSunk(sunkShip);
                        rightText.style.visibility = 'visible';
                    }, '6000');
                    window.setTimeout(() => {
                        topText.textContent = textLoseTop;
                        topText.classList.add('top-end');
                    }, '7000');
                    window.setTimeout(() => {
                        bottomText.textContent = textLoseBottom;
                        bottomText.classList.add('bottom-end');
                        replayBtn.classList.remove('hide');
                        replayBtn.style.visibility = 'hidden';
                    }, '7500');
                    window.setTimeout(() => {
                        replayBtn.style.visibility = 'visible';
                        replayBtn.addEventListener('click', resetGame);
                    }, '8000');
                }
            }
        }
    }

    function recordHit(hitIndex) {
        computerShips.forEach(item => {

            if (item.shipIndex === hitIndex) {
                const shipType = item.shipName;

                if (shipType === 'carrier') {
                    hitShips[0].carrier = hitShips[0].carrier - 1;
                    return shipType;
                } else if (shipType === 'battleship') {
                    hitShips[1].battle = hitShips[1].battle - 1;
                    return shipType;
                } else if (shipType === 'cruiser') {
                    hitShips[2].cruiser = hitShips[2].cruiser - 1;
                    return shipType;
                } else if (shipType === 'submarine') {
                    hitShips[3].sub = hitShips[3].sub - 1;
                    return shipType;
                } else if (shipType === 'destroyer') {
                    hitShips[4].destroy = hitShips[4].destroy - 1;
                    return shipType;
                }
            }
        });
    }

    function checkIfSunk(shipType) {
        if (
            (shipType === 'carrier' && hitShips[0].carrier === 0) ||
            (shipType === 'battleship' && hitShips[1].battle === 0) ||
            (shipType === 'cruiser' && hitShips[2].cruiser === 0) ||
            (shipType === 'submarine' && hitShips[3].sub === 0) ||
            (shipType === 'destroyer' && hitShips[4].destroyer === 0)
        ) {
            return true;
        } else {
            return false;
        }
    }

    function recordSink(num) {
        totalSunk += num;

        if (totalSunk < 5) {
            return;
        } else if (totalSunk === 5) {
            allSunk = true;
        }
    }

    function markSunkShip(shipType) {
        computerShips.forEach(item => {
            if (item.shipName === shipType) {
                const itemIndex = item.shipIndex;
                computerBoard[itemIndex].setAttribute('id', 'sunk');
            }
        });
    }

    function markPlayerSunk(sunkShip) {
        userShips.forEach(item => {
            if (item.shipName === sunkShip) {
                const itemIndex = item.shipIndex;
                userBoard[itemIndex].setAttribute('id', 'sunk');
            }
        });
    }

    function checkAllSunk() {
        return allSunk;
    }

    function resetGame() {
        window.location.reload(true);
    }

    return {
        beginGame,
        userTurn,
        computerTurn,
        recordHit,
        checkIfSunk,
        recordSink,
        markSunkShip,
        markPlayerSunk,
        checkAllSunk,
        resetGame
    };
})();

module.exports = gameplay;