let game_master = class {
  width  = 15;
  height = 15;

  color_main = Color.Gray;
  color_alt  = Color.Black;

  scramble_min = 2;
  scramble_max = 10;

  game_info;

  get scramble_moves() {
    return Math.max(
      this.scramble_min,
      Math.floor(Math.random() * this.scramble_max)
    );
  }

  clear_canvas(g) {
    for (let ix = 0; ix < this.width; ix++) {
      for (let iy = 0; iy < this.height; iy++) {
        g.setDot(ix, iy, this.color_main);
      }
    }
  }

  new_game(g) {
    this.game_info = {
      won:            false,
      moves:          0,
      scramble_moves: this.scramble_moves,
    };

    this.clear_canvas(g);
  }

  scramble(g) {
    var x, y;
    for (let i = 0; i < this.scramble_moves; i++) {
      x = Math.floor(Math.random() * this.width);
      y = Math.floor(Math.random() * this.height);

      flip_cross(g, x, y);
    }
  }
}
