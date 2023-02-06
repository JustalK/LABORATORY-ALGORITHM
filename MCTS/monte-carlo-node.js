"use strict";

/**
 * Class representing a node in the search tree.
 * Stores tree search stats for UCB1.
 */
class MonteCarloNode {
  /**
   * Create a new MonteCarloNode in the search tree.
   * @param {MonteCarloNode} parent - The parent node.
   * @param {Play} play - Last play played to get to this state.
   * @param {State} state - The corresponding state.
   * @param {Play[]} unexpandedPlays - The node's unexpanded child plays.
   */
  constructor(parent, play, state, unexpandedPlays) {
    this.play = play;
    this.state = state;

    // Monte Carlo stuff
    this.n_plays = 0;
    this.n_wins = 0;

    // Tree stuff
    this.parent = parent;
    this.children = new Map();
    for (let play of unexpandedPlays) {
      this.children.set(play.hash(), { play: play, node: null });
    }
  }
}

module.exports = MonteCarloNode;
