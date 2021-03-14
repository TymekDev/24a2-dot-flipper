let text_mover = class {
  initial_padding;
  initial_done;
  static_text;
  text;
  text_offset = 0;

  constructor(static_text, text, initial_padding = 20) {
    this.initial_padding = initial_padding;
    this.static_text = static_text;
    this.text = " ".repeat(initial_padding) + text;

    this.initial_done = false;
    this.text_offset = 0;
  }

  get next() {
    this.move();

    var text = this.text,
        offset = this.text_offset;

    return this.static_text + text.substring(offset, ) + text.substr(0, offset);
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
