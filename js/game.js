let gm = new game_master();

var clicked = {x: null, y: null};

function create(g) {
  gm.new_game(g);

  var x, y;
  for (let i = 0; i < gm.scramble_moves; i++) {
    x = Math.floor(Math.random() * gm.width);
    y = Math.floor(Math.random() * gm.height);

    flip_cross(g, x, y);
  }
}

function update(g) {
  if (gm.game_info.won) {
    g.setText("Congrats! | " + tm.next);
    return;
  }

  if (clicked.x !== null && clicked.y !== null) {
    flip_cross(g, clicked.x, clicked.y);
    clicked.x = null;
    clicked.y = null;
  }


  for (let ix = 0; ix < gm.width; ix++) {
    for (let iy = 0; iy < gm.height; iy++) {
      if (g.getDot(ix, iy) !== Color.Gray) {
        g.setText("Moves: " + gm.game_info.moves);
        return;
      }
    }
  }

  gm.game_info.won = true;
  tm = new text_mover(won_text());

  // Set text immediately to avoid display stutter
  g.setText("Congrats! | " + tm.next);
}

function won_text() {
  var solved = "Solved in " + gm.game_info.moves,
      scrambled = "Scrambled with " + gm.game_info.scramble_moves,
      padding = " · ";

  return solved + padding + scrambled + padding;
}

function onDotClicked(x, y) {
  clicked.x = x;
  clicked.y = y;
  gm.game_info.moves++;
}

let config = {
  containerId: "game",
  create: create,
  update: update,
  onDotClicked: onDotClicked,
  gridHeight: gm.height,
  gridWidth: gm.width,
  clearGrid: false,
  frameRate: 5,
}

let game = new Game(config);
game.run();
