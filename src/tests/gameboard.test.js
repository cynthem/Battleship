const Gameboard = require('../factories/gameboard');

describe('Gameboard functions', () =>{
    let newBoard;

    beforeEach(() => {
        newBoard = new Gameboard();
    });

    it('initializes a gameboard with 100 cells', () => {
        let boardCells = [];
        for (let i = 0; i < 100; i++) {
            boardCells.push({ shipId: null, isShot: false });
        }
        expect(newBoard.board.length).toEqual(boardCells.length);
    });

    it('receives an attack and updates the status of that boards index', () => {
        newBoard.receiveAttack(1);
        let boardCells = [];
        for (let i = 0; i < 100; i++) {
            boardCells.push({ shipId: null, isShot: false });
        }
        boardCells[1].isShot = true;
        expect(newBoard.board[1].isShot).toEqual(boardCells[1].isShot);
    });

    it('returns 0 when no ships are sunk', () => {
        expect(newBoard.sunk).toEqual(0);
    });

    it('returns false if not all ships are sunk', () => {
        expect(newBoard.allSunk()).toEqual(false);
    });
});