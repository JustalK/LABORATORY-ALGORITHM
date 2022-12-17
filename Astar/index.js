const DEFAULT_TILE = " ";
const DEFAULT_PLAYER = "S";
const DEFAULT_GOAL = "E";
const DEFAULT_WALL = "#";

class Goal {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class Tile {
  constructor(x, y, isStart, isGoal, isWall) {
    this.x = x;
    this.y = y;

    if (isWall) {
      this.symbol = DEFAULT_WALL;
    } else if (isStart) {
      this.symbol = DEFAULT_PLAYER;
    } else if (isGoal) {
      this.symbol = DEFAULT_GOAL;
    } else {
      this.symbol = DEFAULT_TILE;
    }
  }
}

class Graph {
  constructor({ width, height, player, goal, wallPercent }) {
    this.map = [];
    for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
        const isStart = j == player.x && i == player.y;
        const isGoal = j == goal.x && i == goal.y;
        const isWall = !isStart && !isGoal && Math.random() < wallPercent;
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

const player = new Player(0, 2);
const goal = new Goal(4, 3);

const graph = new Graph({
  width: 20,
  height: 20,
  player,
  goal,
  wallPercent: 0.1,
});
console.log(graph.toString());
