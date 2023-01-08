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

  /** From given state, repeatedly run MCTS to build statistics. */
  runSearch(state, timeout) {
    // TODO
  }
  /** Get the best move from available statistics. */
  bestPlay(state) {
    // TODO
    // return play
  }
}
module.exports = MonteCarlo;
