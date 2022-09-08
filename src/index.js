/*class Computer {
    constructor(status = { isShot: null, isShip: false, isSunk: false, allSunk: false }) {
        this.status = status;
        this.initialPlay = true;
        this.availableShots = [];
        this.init();
    }
    init() {
        for (let i = 0; i < 100; i++) {
            this.availableShots.push({ isShot: null, isShip: false, isSunk: false, allSunk: false });
        }
    }
    determinePlay() {
        if (this.initialPlay) {
            this.initialPlay = false;
            const firstPlay = 42;
            console.log(firstPlay)
        }
        if (this.status.allSunk) {
            const final = 100;
            console.log(final);
        }
    }
}

        //const firstPlay = availableShots.indexOf(availableShots[Math.floor(Math.random() * availableShots.length)]);
        
const newComputer = new Computer();
newComputer.determinePlay();
newComputer.determinePlay({isShot: 42, isShip: true, isSunk: true, allSunk: true});*/