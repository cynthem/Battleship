const Player = require('../factories/player');

describe('Player function', () => {
    let newPlayer;

    beforeEach(() => {
        newPlayer = new Player('test');
    });

    it('receives and records a fired shot', () => {
        newPlayer.takeHit(99);
        expect(newPlayer.gameboard.board[99].isShot).toEqual(true);
    });

    it('returns an isShot status with the index number', () => {
        const testHit = newPlayer.takeHit(42);
        expect(testHit.isShot).toEqual(42);
    });

    it('returns an isShip status of false when there is no ship', () => {
        const testHit = newPlayer.takeHit(99);
        expect(testHit.isShip).toEqual(false);
    });
});