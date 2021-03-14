let game_master = class {
  width  = 5;
  height = 5;

  color_main = Color.Gray;
  color_alt  = Color.Black;

  scramble_min = 2;
  scramble_max = 10;

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
}
