let dim = {
  w: 15,
  h: 15,
}

var moves = 0,
    max_req_moves = 15,
    clicked = {x: null, y: null};

function create(g) {
  let n_moves = Math.floor(Math.random() * 15);

  for (let i = 0; i < max_req_moves; i++) {
    x = Math.floor(Math.random() * dim.w);
    y = Math.floor(Math.random() * dim.h);

    flipCross(g, x, y);
  }
}

function update(g) {
  if (clicked.x !== null && clicked.y !== null) {
    flipCross(g, clicked.x, clicked.y);
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
  g.setText("Congrats! Solved with " + moves + " move" + s + ".");
  g.end()
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
