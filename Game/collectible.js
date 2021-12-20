import GameObject from "./gameObject.js";
import GLOBALS from "./globalStorage.js";

/*
Class that represents collectible objects on the game field
*/
class Collectible extends GameObject {
  image;

  constructor(x = 0, y = 0, width = 50, height = 50) {
    super(x, y, width, height);
    this.init();
  }

  init() {
    this.image = new Image();
    this.image.src = "./mouse.png";
  }

  render() {
    GLOBALS.context.translate(this.x, this.y);
    GLOBALS.context.drawImage(
      this.image,
      -this.width / 2,
      -this.height / 2,
      this.width,
      this.height
    );
    GLOBALS.context.resetTransform();
  }
}

export default Collectible;
