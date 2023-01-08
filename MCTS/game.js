const State = require("./state.js");
const N_ROWS = 6;
const N_COLS = 7;

const boardPrototype = [
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
];

/** Class representing the game board. */
class Game {
  /** Generate and return the initial game state. */
  start() {
    const newBoard = boardPrototype.map((row) => row.slice());
    return new State([], newBoard, 1);
  }
  /** Return the current player’s legal moves from given state. */
  legalPlays(state) {
    // TODO
    return plays;
  }
  /** Advance the given state and return it. */
  nextState(state, move) {
    // TODO
    return newState;
  }
  /** Return the winner of the game. */
  winner(state) {
    if (
      !isNaN(state.board[0].reduce((acc, cur) => (cur == 0 ? NaN : acc + cur)))
    )
      return 0;

    let checkBoards = new Map();
    checkBoards.set(
      "horiz",
      checkPrototype.map((row) => row.slice())
    );
    checkBoards.set(
      "verti",
      checkPrototype.map((row) => row.slice())
    );
    checkBoards.set(
      "ldiag",
      checkPrototype.map((row) => row.slice())
    );
    checkBoards.set(
      "rdiag",
      checkPrototype.map((row) => row.slice())
    );

    for (let row = 0; row < N_ROWS; row++) {
      for (let col = 0; col < N_COLS; col++) {
        let cell = state.board[row][col];
        for (let [key, val] of checkBoards) {
          let acc;
          switch (key) {
            case "horiz":
              acc = val[row + 1][col]; // left
              break;
            case "verti":
              acc = val[row][col + 1]; // top
              break;
            case "ldiag":
              acc = val[row][col]; // top left
              break;
            case "rdiag":
              acc = val[row][col + 2]; // top right
              break;
          }

          val[row + 1][col + 1] = cell;
          if ((cell < 0 && acc < 0) || (cell > 0 && acc > 0)) {
            val[row + 1][col + 1] += acc;
          }
          if (val[row + 1][col + 1] == 4) return 1;
          if (val[row + 1][col + 1] == -4) return -1;
        }
      }
    }

    return winner;
  }
}
module.exports = Game;
