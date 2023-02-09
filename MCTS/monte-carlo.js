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

      if (node.isLeaf() === false && winner === null) {
        node = this.expand(node);
        winner = this.simulate(node);
      }
      this.backpropagate(node, winner);

      if (winner === 0) draws++;
      totalSims++;
    }
  }
  /** Get the best move from available statistics. */
  bestPlay(state) {
    // TODO
    // return play
  }

  /**
   * Phase 1: Selection
   * Select until EITHER not fully expanded OR leaf node
   * @param {State} state - The root state to start selection from.
   * @return {MonteCarloNode} The selected node.
   */
  select(state) {
    let node = this.nodes.get(state.hash());
    while (node.isFullyExpanded() && !node.isLeaf()) {
      let plays = node.allPlays();
      let bestPlay;
      let bestUCB1 = -Infinity;
      for (let play of plays) {
        let childUCB1 = node.childNode(play).getUCB1(this.UCB1ExploreParam);
        if (childUCB1 > bestUCB1) {
          bestPlay = play;
          bestUCB1 = childUCB1;
        }
      }
      node = node.childNode(bestPlay);
    }
    return node;
  }

  /**
   * Phase 2: Expansion
   * Of the given node, expand a random unexpanded child node
   * @param {MonteCarloNode} node - The node to expand from. Assume not leaf.
   * @return {MonteCarloNode} The new expanded child node.
   */
  expand(node) {
    let plays = node.unexpandedPlays();
    let index = Math.floor(Math.random() * plays.length);
    let play = plays[index];

    let childState = this.game.nextState(node.state, play);
    let childUnexpandedPlays = this.game.legalPlays(childState);
    let childNode = node.expand(play, childState, childUnexpandedPlays);
    this.nodes.set(childState.hash(), childNode);

    return childNode;
  }
}
module.exports = MonteCarlo;
