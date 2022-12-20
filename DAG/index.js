// directed-acyclic-graph

class Tile {
  left;
  top;
  right;
  bottom;

  update(left = null, top = null, right = null, bottom = null) {
    this.left = left;
    this.top = top;
    this.right = right;
    this.bottom = bottom;
  }
}

class Graph {
  constructor() {
    const A = new Tile(),
      B = new Tile(),
      C = new Tile(),
      D = new Tile(),
      E = new Tile();

    A.update(null, null, B, null);
    B.update(A, null, null, C);
    C.update(null, B, D, E);
    D.update(C, null, null, null);
    E.update(null, C, null, null);
  }
}

// A B X X
// X C D X
// X E X X
