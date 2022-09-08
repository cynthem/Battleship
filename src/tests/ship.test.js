const ship = require('../factories/ship');

test('takes a hit', () => {
    const battleship = new ship('battleship', 4);
    battleship.isHit(1);
    expect(battleship.hits).toEqual([1]);
});

test('takes multiple hits', () => {
    const destroyer = new ship('destroyer', 2);
    destroyer.isHit(30);
    destroyer.isHit(40);
    expect(destroyer.hits).toEqual([30, 40]);
});

test('determines sunk boat', () => {
    const destroyer = new ship('destroyer', 2);
    destroyer.isHit(30);
    destroyer.isHit(40);
    expect(destroyer.isSunk()).toBe(true);
});

test('determines boat not sunk', () => {
    const submarine = new ship('submarine', 3);
    submarine.isHit(0);
    submarine.isHit(1);
    expect(submarine.isSunk()).toBe(false);
});