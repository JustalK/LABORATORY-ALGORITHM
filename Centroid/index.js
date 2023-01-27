class Tile {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  setX(x) {
    this.x = x;
  }

  setY(y) {
    this.y = y;
  }
}

const findCentroid = (tiles) => {
  const n = tiles.length;
  let rsl = new Tile(0, 0);
  let A = 0;

  for (let i = 0; i < n; i++) {
    let x0 = tiles[i].x;
    let y0 = tiles[i].y;
    let x1 = tiles[(i + 1) % n].x;
    let y1 = tiles[(i + 1) % n].y;

    // Shoelace formula
    let L = x0 * y1 - x1 * y0;
    A += L;

    rsl.setX(rsl.x + (x0 + x1) * L);
    rsl.setY(rsl.y + (y0 + y1) * L);
  }

  A *= 0.5;
  rsl.setX(rsl.x / (6 * A));
  rsl.setY(rsl.y / (6 * A));

  return rsl;
};

const tiles = [new Tile(0, 0), new Tile(0, 8), new Tile(8, 8), new Tile(8, 0)];

console.log(findCentroid(tiles));
// {x: 4, y: 4}
