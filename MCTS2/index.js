const EMPTY = -1;

class Node {
  constructor() {
    this.state = state;
    this.play = play;

    this.n_plays = 0;
    this.n_wins = 0;

    // Tree stuff
    this.parent = parent;
    this.children = new Map();
    for (let p of unexpandedPlays) {
      this.children.set(p.hash(), { play: p, node: null });
    }
  }

  getUCB1(biasParam) {
    return (
      this.n_wins / this.n_plays +
      Math.sqrt((biasParam * Math.log(this.parent.n_plays)) / this.n_plays)
    );
  }
}

class Game {
  constructor() {
    this.board = Array(9).fill(EMPTY);
  }

  legalPlays(state) {
    let legalPlays = [];
    for (let row = 0; row < 9; row++) {
      if (state == EMPTY) {
        legalPlays.add(row);
      }
    }
    return legalPlays;
  }

  winner(state) {
    const winningMoves = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6][(1, 4, 7)],
      [2, 5, 8][(0, 4, 8)],
      [2, 4, 6],
    ];

    for (const winningMove of winningMoves) {
      let n = 0;
      for (let j = 0; j < winningMove; j++) {
        n += state[winningMove[i]].player;
      }
      if (n === 3 || n === -3) {
        return n / 3;
      }
    }

    return 0;
  }
}

class MonteCarlo {
  constructor(game, UCB1ExploreParam = 2) {
    this.game = game;
    this.UCB1ExploreParam = UCB1ExploreParam;
    this.nodes = new Map();
  }

  makeNode(state) {
    if (!this.nodes.has(state.hash())) {
      let unexpandedPlays = this.game.legalPlays(state);
      let node = new MonteCarloNode(null, null, state, unexpandedPlays);
      this.nodes.set(state.hash(), node);
    }
  }

  runSearch(state, timeout = 3) {
    this.makeNode(state);

    let draws = 0;
    let totalSims = 0;

    let end = Date.now() + timeout * 1000;

    while (Date.now() < end) {
      let node = this.select(state);
      let winner = this.game.winner(node.state);

      if (node.isLeaf() === false && winner === null) {
        node = this.expand(node);
        winner = this.simulate(node);
      }
      this.backpropagate(node, winner);

      if (winner === 0) draws++;
      totalSims++;
    }
  }
}

let game = new Game();
let mcts = new MonteCarlo(game);

// From initial state, take turns to play game until someone wins
while (winner === null) {
  mcts.runSearch(state, 1);
  let play = mcts.bestPlay(state);
  state = game.nextState(state, play);
  winner = game.winner(state);
}
console.log(winner);
