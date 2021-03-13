var clicked = {
  x: null,
  y: null,
}

function create(g) {}

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

let dim = {
  w: 5,
  h: 5,
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
