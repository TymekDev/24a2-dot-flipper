let gm = new game_master();

var tm;

function create(g) {
  gm.new_game(g);
}

function update(g) {
  if (gm.game_info.won) {
    g.setText(tm.next);
    return;
  }

  if (!gm.was_clicked) {
    return;
  }

  gm.move(g);

  if (gm.has_player_won(g)) {
    tm = new text_mover("Congrats! | ", gm.win_text);

    // Set text immediately to avoid display stutter
    g.setText(tm.next);
  }
}

function onDotClicked(x, y) {
  gm.game_info.clicked = {x: x, y: y};
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
