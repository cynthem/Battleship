const Player = require('../factories/Player');
const Computer = require('../factories/Computer');

const gameplay = (() => {

    let userPlayer;
    let computerPlayer;
    let randomizeMove;
    let nextMove;
    let moveResult;
    let userShips = [];

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
        moveResult = userPlayer.takeHit(nextMove);

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

    return {
        beginGame
    };
})();

module.exports = gameplay;