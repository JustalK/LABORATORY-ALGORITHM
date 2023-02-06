/** Class representing the Monte Carlo search tree. */
class MonteCarlo {
  /**
   * Create a Monte Carlo search tree.
   * @param {Game} game - The game to query regarding legal moves and state advancement.
   * @param {number} UCB1ExploreParam - The square of the bias parameter in the UCB1 algorithm; defaults to 2.
   */
  constructor(game, UCB1ExploreParam = 2) {
    this.game = game;
    this.UCB1ExploreParam = UCB1ExploreParam;
    this.nodes = new Map(); // map: State.hash() => MonteCarloNode
  }

  makeNode(state) {
    if (!this.nodes.has(state.hash())) {
      let unexpandedPlays = this.game.legalPlays(state).slice();
      let node = new MonteCarloNode(null, null, state, unexpandedPlays);
      this.nodes.set(state.hash(), node);
    }
  }

  /** From given state, repeatedly run MCTS to build statistics. */
  runSearch(state, timeout = 3) {
    this.makeNode(state);

    let draws = 0;
    let totalSims = 0;

    let end = Date.now() + timeout * 1000;

    while (Date.now() < end) {
      let node = this.select(state);
      let winner = this.game.winner(node.state);

      if (winner === 0) draws++;
      totalSims++;
    }
  }
  /** Get the best move from available statistics. */
  bestPlay(state) {
    // TODO
    // return play
  }
}
module.exports = MonteCarlo;
