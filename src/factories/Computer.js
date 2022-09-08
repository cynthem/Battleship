function computerPlay(status = { isShot: null, isShip: false, isSunk: false, allSunk: false }) {
    let initialPlay = true;
    let availableShots = [];
    let hits = [];

    for (let i = 0; i < 100; i++) {
        availableShots.push({ isShot: null, isShip: false, isSunk: false, allSunk: false });
    }

    if (initialPlay) {
        initialPlay = false;
        const firstPlay = availableShots.indexOf(availableShots[Math.floor(Math.random() * availableShots.length)]);
        return firstPlay;
    }

    if (status.allSunk) {
        return 100;
    }
}