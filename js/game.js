let dim = {
  w: 15,
  h: 15,
}

var max_req_moves = 15,
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
}

function onDotClicked(x, y) {
  clicked.x = x;
  clicked.y = y;
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
