// flip_cross changes color between Color.Gray and Color.Black for dots at
// (x, *) and (*, y)
function flip_cross(g, x, y) {
  for (let ix = 0; ix < dim.w; ix++) {
    flip_dot(g, ix, y);
  }

  for (let iy = 0; iy < dim.h; iy++) {
    // Skip (x, y) as it was already flipped
    if (iy == y) {
      continue;
    }

    flip_dot(g, x, iy);
  }
}

// flip_dot changes color between Color.Gray and Color.Black for dot at (x, y)
function flip_dot(g, x, y) {
  let isGray = (g.getDot(x, y) == Color.Gray)
  g.setDot(x, y, isGray ? Color.Black : Color.Gray);
}
