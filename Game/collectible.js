import GameObject from "./gameObject.js";
import GLOBALS from "./globalStorage.js";

/*
Class that represents collectible objects on the game field
*/
class Collectible extends GameObject {
  image;
  collectibleCreated;
  maxAge; //seconds

  constructor(x = 0, y = 0, width = 50, height = 50) {
    super(x, y, width, height);
    this.collectibleCreated = performance.now();
    this.maxAge = 5;
    this.age = 0;
    this.init();
  }

  init() {
    this.image = new Image();
    this.image.src = "./mouse.png";
  }

  update(delta) {
    this.age += delta/1000;
    if (this.age >= this.maxAge && typeof this.removeCallback === "function") {
      this.removeCallback();
    }
  }

  render() {
    super.render();
    GLOBALS.context.translate(this.x, this.y);
    GLOBALS.context.drawImage(
      this.image,
      -this.width / 2,
      -this.height / 2,
      this.width,
      this.height
    );
    GLOBALS.context.fillStyle = "yellow";
    const agePercentage = this.age/ this.maxAge;
    GLOBALS.context.fillRect(this.width/2 + 5,-this.height/2 + this.height*agePercentage, 5, this.height - this.height*agePercentage);
    GLOBALS.context.resetTransform();
  }

  onRemove(removeCallback) {
    this.removeCallback = removeCallback;
  }
}

export default Collectible;
