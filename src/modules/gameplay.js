const Player = require('../factories/Player');
const Computer = require('../factories/Computer');

const gameplay = (() => {

    let userPlayer;
    let computerPlayer;
    let randomizeMove;
    let nextMove;
    let playerStatus;
    let computerStatus;

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
    let playerName = '';
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
        // cellId: 0, shipId: 'none', isShot: true, isSunk: false, allSunk: false
        // cellId: 1, shipId: carrier, isShot: true, isSunk: false, allSunk: false
        // cellId: 2, shipId: carrier, isShot: true, isSunk: true, allSunk: false
        // cellId: 3, shipId: carrier, isShot: true, isSunk: true, allSunk: true

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
                        bottomText.removeChild(rightText);
                        bottomText.textContent = '';
                        topText.textContent = textWinTop;
                        topText.classList.add('top-end');
                    }, '2500');
                    window.setTimeout(() => {
                        replayBtn.classList.remove('hide');
                        replayBtn.style.visibility = 'hidden';
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

    function computerTurn() {}

    function markSunkShip(shipType) {}

    function resetGame() {}

    return {
        beginGame,
        userTurn,
        computerTurn,
        markSunkShip,
        resetGame
    };
})();

module.exports = gameplay;