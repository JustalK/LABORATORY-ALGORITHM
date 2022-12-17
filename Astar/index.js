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
    this.f = Infinity;
    this.wall = false;

    if (isWall) {
      this.wall = true;
      this.symbol = DEFAULT_WALL;
    } else if (isStart) {
      this.symbol = DEFAULT_PLAYER;
    } else if (isGoal) {
      this.symbol = DEFAULT_GOAL;
    } else {
      this.symbol = DEFAULT_TILE;
    }
  }

  setF(value) {
    this.f = value;
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

  findPath(xStart, yStart, xEnd, yEnd) {
    const path = [];
    const openTiles = [];
    const closedTiles = [];
    let currentTile;

    const endTile = this.getTileAt(xEnd, yEnd);

    const startTile = this.getTileAt(xStart, yStart);
    startTile.f = 0;
    startTile.g = 0;
    openTiles.push(startTile);

    while (openTiles.length !== 0) {
      currentTile = openTiles.reduce((best, current) =>
        best && current.f > best.f ? best : current
      );

      // Add the best tile to closed list
      closedTiles.push(currentTile);

      // Remove the currentTile to open tiles
      const indexCurrentTile = openTiles.indexOf(
        (t) => t.x === currentTile.x && t.y === currentTile.y
      );
      openTiles.splice(indexCurrentTile, 1);

      // Check
      const isEnd = closedTiles.some((t) => t.x === xEnd && t.y === yEnd);
      if (isEnd) {
        break;
      }

      const adjacentTiles = this.getAdjacentTiles(currentTile.x, currentTile.y);

      for (const adjacentTile of adjacentTiles) {
        // Should add not traversable
        const isAlreadyClosedTile = closedTiles.some(
          (t) =>
            (t.x === adjacentTile.x && t.y === adjacentTile.y) ||
            adjacentTile.wall
        );
        if (!isAlreadyClosedTile) {
          const isAlreadyOpenTile = openTiles.some(
            (t) => t.x === adjacentTile.x && t.y === adjacentTile.y
          );
          const gScore = currentTile.g + 1;

          if (!isAlreadyOpenTile) {
            openTiles.push(adjacentTile);
          } else if (gScore >= adjacentTile.g) {
            continue;
          }

          adjacentTile.g = gScore;
          adjacentTile.h = this.distance(adjacentTile, endTile);
          adjacentTile.f = adjacentTile.g + adjacentTile.h;
          adjacentTile.parent = currentTile;
        }
      }
    }

    let temp = currentTile;
    path.push(temp);
    while (temp.parent) {
      path.push(temp.parent);
      temp = temp.parent;
    }
    return path.reverse();
  }

  distance(tileA, tileB) {
    return Math.abs(tileA.x - tileB.x) + Math.abs(tileA.y - tileB.y);
  }

  getTileAt(x, y) {
    return this.map.find((t) => t.x === x && t.y === y);
  }

  getAdjacentTiles(x, y) {
    const rsl = [];
    const adjacentPositions = [
      { x: x + 1, y },
      { x: x - 1, y },
      { x, y: y + 1 },
      { x, y: y - 1 },
    ];

    for (const adjacentPosition of adjacentPositions) {
      const tile = this.getTileAt(adjacentPosition.x, adjacentPosition.y);
      if (tile) {
        rsl.push(tile);
      }
    }

    return rsl;
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
graph.toString();
console.log("===========================");
const pathTiles = graph.findPath(0, 2, 4, 3);

for (const pathTile of pathTiles) {
  console.log(`{${pathTile.x}, ${pathTile.y}}`);
}
