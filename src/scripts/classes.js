class Sprite {
  constructor({ position, velocity, image, frames = { max: 1 }, scale = 1 }) {
    this.position = position;
    this.image = image;
    this.frames = frames;
    this.scale = scale;

    this.width = 0;
    this.height = 0;

    this.image.onload = () => {
      this.width = (this.image.width / this.frames.max) * this.scale;
      this.height = this.image.height * this.scale;
    };
  }

  draw(c) {
    c.drawImage(
      this.image,
      0,
      0,
      this.image.width / this.frames.max,
      this.image.height,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }
}
