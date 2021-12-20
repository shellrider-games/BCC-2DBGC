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


}

export default Collectible;
