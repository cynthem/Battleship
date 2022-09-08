const player = require('../factories/player');

describe('Player function', () => {
    let newPlayer;

    beforeEach(() => {
        newPlayer = new player('test');
    });

    it('receives and records a fired shot', () => {
        newPlayer.takeHit(99);
        expect(newPlayer.gameboard.board[99].isShot).toEqual(true);
    });

    it('returns "miss" when the shot misses', () => {
        expect(newPlayer.takeHit(99)).toEqual('miss');
    });
});