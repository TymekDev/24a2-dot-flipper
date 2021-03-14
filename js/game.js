let dim = {
  w: 15,
  h: 15,
}

var min_req_moves = 2,
    max_req_moves = 10,
    clicked = {x: null, y: null};

// Variables set within reset()
var won,
    moves,
    scramble_moves;

function create(g) {
  reset(g);

  var x, y;
  for (let i = 0; i < scramble_moves; i++) {
    x = Math.floor(Math.random() * dim.w);
    y = Math.floor(Math.random() * dim.h);

    flip_cross(g, x, y);
  }
}

function reset(g) {
  won = false;
  moves = 0;
  scramble_moves = Math.max(
    min_req_moves,
    Math.floor(Math.random() * max_req_moves)
  );

  for (let ix = 0; ix < dim.w; ix++) {
    for (let iy = 0; iy < dim.h; iy++) {
      g.setDot(ix, iy, Color.Gray);
    }
  }
}

function update(g) {
  if (won) {
    g.setText("Congrats! | " + tm.next);
    return;
  }

  if (clicked.x !== null && clicked.y !== null) {
    flip_cross(g, clicked.x, clicked.y);
    clicked.x = null;
    clicked.y = null;
  }


  for (let ix = 0; ix < dim.w; ix++) {
    for (let iy = 0; iy < dim.h; iy++) {
      if (g.getDot(ix, iy) !== Color.Gray) {
        g.setText("Moves: " + moves);
        return;
      }
    }
  }

  won = true;
  tm = new text_mover(won_text());

  // Set text immediately to avoid display stutter
  g.setText("Congrats! | " + tm.next);
}

function won_text() {
  var solved = "Solved in " + moves,
      scrambled = "Scrambled with " + scramble_moves,
      padding = " · ";

  return solved + padding + scrambled + padding;
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
  frameRate: 5,
}

let game = new Game(config);
game.run();
