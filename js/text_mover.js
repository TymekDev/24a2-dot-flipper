let text_mover = class {
  initial_padding;
  initial_done;
  text;
  text_offset = 0;

  constructor(text, initial_padding = 20) {
    this.initial_padding = initial_padding;
    this.text = " ".repeat(initial_padding) + text;

    this.initial_done = false;
    this.text_offset = 0;
  }

  get next() {
    this.move();

    var text = this.text,
        text_offset = this.text_offset;

    return text.substring(text_offset, ) + text.substr(0, text_offset);
  }

  move() {
    this.text_offset = (this.text_offset + 1) % this.text.length;

    if (this.initial_done) {
      return;
    }

    // Removing initial padding once it is out of view
    if (this.text_offset === this.initial_padding) {
      this.text = this.text.substring(this.initial_padding);

      this.text_offset = 0;
      this.initial_done = true;
    }
  }
}
