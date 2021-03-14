let game_master = class {
  width      = 5;
  height     = 5;
  color_main = Color.Gray;
  color_alt  = Color.Black;

  clear_canvas(g) {
    for (let ix = 0; ix < this.width; ix++) {
      for (let iy = 0; iy < this.height; iy++) {
        g.setDot(ix, iy, this.color_main);
      }
    }
  }
}
