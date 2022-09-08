class Ship {
    constructor(name, length) {
        this.name = name;
        this.length = length;
        this.hits = [];
    }
    isHit(i) {
        this.hits.push(i);
    }
    isSunk() {
        return this.hits.length === this.length;
    }
}

module.exports = Ship;