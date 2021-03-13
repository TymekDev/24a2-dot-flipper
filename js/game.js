function create(g) {}

function update(g) {}

function onDotClicked(d) {}

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
}

let game = new Game(config);
game.run();
