let dim = {
  w: 15,
  h: 15,
}

var min_req_moves = 2,
    max_req_moves = 10,
    clicked = {x: null, y: null};

// Variables set within create
var won,
    moves,
    scramble_moves,
    text,
    text_offset,
    padding_size;

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
  text = "";
  text_offset = 0,
  padding_size = 20;

  for (let ix = 0; ix < dim.w; ix++) {
    for (let iy = 0; iy < dim.h; iy++) {
      g.setDot(ix, iy, Color.Gray);
    }
  }
}

function update(g) {
  if (won) {
    if (text_offset === padding_size) {
      padding_size = -1;
      text_offset = 0;
      text = won_text(0);
    }

    g.setText("Congrats! | " + moving_text());

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
  text = won_text(padding_size);

  // Set text immediately to avoid display stutter
  g.setText("Congrats! | " + moving_text());
}

function won_text(padding_size) {
  var solved = "Solved in " + moves,
      scrambled = "Scrambled with " + scramble_moves,
      padding = " · ";

  return " ".repeat(padding_size) + solved + padding + scrambled + padding;
}

function moving_text() {
  text_offset = (text_offset + 1) % text.length;

  return text.substring(text_offset, ) + text.substr(0, text_offset);
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
