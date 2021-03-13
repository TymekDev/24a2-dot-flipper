let dim = {
  w: 15,
  h: 15,
}

var moves,
    min_req_moves = 2,
    max_req_moves = 10,
    clicked = {x: null, y: null};

function create(g) {
  let n_moves = Math.floor(Math.random() * max_req_moves);
  n_moves = Math.max(n_moves, min_req_moves);

  moves = 0;

  for (let i = 0; i < n_moves; i++) {
    x = Math.floor(Math.random() * dim.w);
    y = Math.floor(Math.random() * dim.h);

    flip_cross(g, x, y);
  }
}

function update(g) {
  if (clicked.x !== null && clicked.y !== null) {
    flip_cross(g, clicked.x, clicked.y);
    clicked.x = null;
    clicked.y = null;
  }

  g.setText("Moves: " + moves);

  for (let ix = 0; ix < dim.w; ix++) {
    for (let iy = 0; iy < dim.h; iy++) {
      if (g.getDot(ix, iy) != Color.Gray) {
        return;
      }
    }
  }

  s = moves > 1 ? "s" : ""
  g.setText("Congrats! Solved in " + moves + ".");
}

function onDotClicked(x, y) {
  clicked.x = x;
  clicked.y = y;
  moves++;
}

let config = {
  containerId: "game",
  create: create,
  update: update,
  onDotClicked: onDotClicked,
  gridHeight: dim.h,
  gridWidth: dim.w,
  clearGrid: false,
}

let game = new Game(config);
game.run();
