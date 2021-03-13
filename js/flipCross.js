// flipCross changes color between Color.Gray and Color.Black for dots at
// (x, *) and (*, y)
function flipCross(g, x, y) {
  for (let ix = 0; ix < dim.w; ix++) {
    flipDot(g, ix, y);
  }

  for (let iy = 0; iy < dim.h; iy++) {
    // Skip (x, y) as it was already flipped
    if (iy == y) {
      continue;
    }

    flipDot(g, x, iy);
  }
}

// flipDot changes color between Color.Gray and Color.Black for dot at (x, y)
function flipDot(g, x, y) {
  let isGray = (g.getDot(x, y) == Color.Gray)
  g.setDot(x, y, isGray ? Color.Black : Color.Gray);
}
