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
    // For A*
    this.f = 0;
    this.g = 0;
    this.h = 0;
    // Info
    this.cost = 1;
    this.visited = false;
    this.closed = false;
    this.parant = null;
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

  toString() {
    console.log(`{${this.x}, ${this.y}}`);
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

  /**
   * The A* algorythm
   * @param {*} xStart The x position of the start
   * @param {*} yStart The y position of the start
   * @param {*} xEnd The x position of the goal
   * @param {*} yEnd The y position of the goal
   * @returns The best path for going for start position to end and avoiding the walls
   */
  findPath(xStart, yStart, xEnd, yEnd) {
    // Get the tiles for the start and the end
    const endTile = this.getTileAt(xEnd, yEnd);
    const startTile = this.getTileAt(xStart, yStart);

    // Initialize some variable
    const path = [];
    let openTiles = [];
    let currentTile;
    let hasPath = false;

    // Put the starting tile in the OPEN tiles
    openTiles.push(startTile);

    // Until we have tiles to analize in the OPEN tiles
    while (openTiles.length !== 0) {
      // Get the tile with the lowest F
      currentTile = openTiles.reduce(
        (best, current) => (best && best.f < current.f ? best : current),
        openTiles[0]
      );

      // Remove the tile from the OPEN tiles
      const index = openTiles.findIndex(
        (t) => t.x == currentTile.x && t.y == currentTile.y
      );
      openTiles.splice(index, 1);

      // Close it for not coming back to it
      currentTile.closed = true;

      // Check if a path has been find, is the current tile the end one?
      if (currentTile.x === xEnd && currentTile.y === yEnd) {
        hasPath = true;
        break;
      }

      // For all tiles neighbooring the current one
      const adjacentTiles = this.getAdjacentTiles(currentTile.x, currentTile.y);
      for (const adjacentTile of adjacentTiles) {
        // If tiles has already been CLOSED or if it's a wall
        if (adjacentTile.closed || adjacentTile.wall) {
          continue;
        }

        // Calculate the gScore (in my case, all tiles are 1. But if it was mountains/plain, it could be different value by tiles)
        const gScore = currentTile.g + adjacentTile.cost;
        const isBeenVisited = adjacentTile.visited;

        // If the tile has not been visited or the gScore value is better
        if (!isBeenVisited || gScore <= adjacentTile.g) {
          adjacentTile.visited = true;
          adjacentTile.parent = currentTile;
          adjacentTile.h = this.manhattan(adjacentTile, endTile);
          adjacentTile.g = gScore;
          adjacentTile.f = adjacentTile.g + adjacentTile.h;

          // If it has not been visited, we add it to the OPEN tiles
          if (!isBeenVisited) {
            openTiles.push(adjacentTile);
          }
        }
      }
    }

    if (!hasPath) {
      console.log("NO PATH FOUND!");
    }

    // For showing the path using the parent of each nodes
    let temp = currentTile;
    path.push(temp);
    while (temp.parent) {
      path.push(temp.parent);
      temp = temp.parent;
    }
    return path.reverse();
  }

  manhattan(tileA, tileB) {
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

const player = new Player(0, 1);
const goal = new Goal(3, 2);

const graph = new Graph({
  width: 4,
  height: 4,
  player,
  goal,
  wallPercent: 0.3,
});
graph.toString();
const pathTiles = graph.findPath(player.x, player.y, goal.x, goal.y);
console.log("===========================");
for (const pathTile of pathTiles) {
  pathTile.toString();
}
