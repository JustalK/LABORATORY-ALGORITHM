class Tile {
  constructor(x, y, isStart, isGoal, isWall) {
    this.x = x;
    this.y = y;

    if (isWall) {
      this.symbol = "#";
    } else if (isStart) {
      this.symbol = "S";
    } else if (isGoal) {
      this.symbol = "E";
    } else {
      this.symbol = " ";
    }
  }
}

class Graph {
  constructor(width, height, jx, jy, gx, gy, walls) {
    this.map = [];
    for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
        const isStart = j == jx && i == jy;
        const isGoal = j == gx && i == gy;
        const isWall = !isStart && !isGoal && Math.random() < walls;
        this.map.push(new Tile(j, i, isStart, isGoal, isWall));
      }
    }
  }

  toString() {
    let i = 0;
    let rsl = [];
    for (const tile of this.map) {
      if (tile.y == i) {
        rsl.push(`[${tile.symbol}]`);
      } else {
        console.log(rsl.join(""));
        rsl = [`[${tile.symbol}]`];
        i++;
      }
    }
    console.log(rsl.join(""));
  }
}

const graph = new Graph(20, 20, 0, 2, 4, 3, 0.1);
console.log(graph.toString());
