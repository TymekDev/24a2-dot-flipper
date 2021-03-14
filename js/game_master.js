let game_master = class {
  width  = 15;
  height = 15;

  color_main = Color.Gray;
  color_alt  = Color.Black;

  scramble_min = 2;
  scramble_max = 10;

  game_info = {
    won:            undefined,
    moves:          undefined,
    scramble_moves: undefined,
    clicked:        null,
  };

  get was_clicked() {
    return this.game_info.clicked !== null;
  }

  get scramble_moves() {
    return Math.max(
      this.scramble_min,
      Math.floor(Math.random() * this.scramble_max)
    );
  }

  get win_text() {
    var solved = "Solved in " + this.game_info.moves,
        scrambled = "Scrambled with " + this.game_info.scramble_moves,
        padding = " · ";

    return solved + padding + scrambled + padding;
  }

  new_game(g) {
    this.game_info = {
      won:            false,
      moves:          0,
      scramble_moves: this.scramble_moves,
      clicked:        null,
    };

    this.clear_canvas(g);
    this.scramble(g);
    g.setText("Moves: 0");
  }

  clear_canvas(g) {
    for (let ix = 0; ix < this.width; ix++) {
      for (let iy = 0; iy < this.height; iy++) {
        g.setDot(ix, iy, this.color_main);
      }
    }
  }

  scramble(g) {
    var x, y;
    for (let i = 0; i < this.scramble_moves; i++) {
      x = Math.floor(Math.random() * this.width);
      y = Math.floor(Math.random() * this.height);

      this.flip_cross(g, x, y);
    }
  }

  move(g) {
    this.flip_cross(g, this.game_info.clicked.x, this.game_info.clicked.y);
    this.game_info.clicked = null;

    g.setText("Moves: " + ++this.game_info.moves);
  }

  // flip_cross changes color between this.color_main and this.color_alt for
  // dots with coordinates (x, *) and (*, y)
  flip_cross(g, x, y) {
    for (let ix = 0; ix < this.width; ix++) {
      this.flip_dot(g, ix, y);
    }

    for (let iy = 0; iy < this.height; iy++) {
      // Skip (x, y) as it was already flipped
      if (iy == y) {
        continue;
      }

      this.flip_dot(g, x, iy);
    }
  }

  // flip_dot changes color between this.color_main and this.color_alt for dot
  // at (x, y)
  flip_dot(g, x, y) {
    let is_main = (g.getDot(x, y) == this.color_main);
    g.setDot(x, y, is_main ? this.color_alt : this.color_main);
  }

  has_player_won(g) {
    for (let ix = 0; ix < this.width; ix++) {
      for (let iy = 0; iy < this.height; iy++) {
        if (g.getDot(ix, iy) !== this.color_main) {
          return false;
        }
      }
    }

    this.game_info.won = true;

    return true;
  }
}
