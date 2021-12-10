import GLOBALS from "./globalStorage.js";
import GameObject from "./gameObject.js";

class Player extends GameObject {
  #velocity;
  #facing;
  #speed;
  image;
  #currentKeys = {};

  init() {
    document.addEventListener("keydown", (event) => {
      this.#currentKeys[event.code] = true;
    });
    document.addEventListener("keyup", (event) => {
      this.#currentKeys[event.code] = false;
    });
    this.image = new Image();
    this.image.src = "./run-still.png";
  }

  constructor(x = 0, y = 0, width = 100, height = 100) {
    super(x,y,width,height);
    this.#speed = 0.25;
    this.#velocity = { x: 0, y: 0 };
    this.#facing = 1;
  }

  getInputVector() {
    let n = 0;
    let e = 0;
    let s = 0;
    let w = 0;
    if (typeof this.#currentKeys["ArrowRight"] === "boolean") {
      e = +this.#currentKeys["ArrowRight"];
    }
    if (typeof this.#currentKeys["ArrowLeft"] === "boolean") {
      w = +this.#currentKeys["ArrowLeft"];
    }
    if (typeof this.#currentKeys["ArrowUp"] === "boolean") {
      n = +this.#currentKeys["ArrowUp"];
    }
    if (typeof this.#currentKeys["ArrowDown"] === "boolean") {
      s = +this.#currentKeys["ArrowDown"];
    }
    return [e - w, s - n];
  }

  update(delta) {
    let velocity = this.getInputVector();
    const directionValue = Math.sqrt(velocity[0] ** 2 + velocity[1] ** 2);
    if (directionValue) {
      velocity[0] /= directionValue;
      velocity[1] /= directionValue;
    }
    this.#velocity.x = velocity[0] * this.#speed;
    this.#velocity.y = velocity[1] * this.#speed;
    if (this.#velocity.x < 0) {
      this.#facing = -1;
    }
    if (this.#velocity.x > 0) {
      this.#facing = 1;
    }
    this.x = this.x + this.#velocity.x * delta;
    this.x = Math.max(
      this.width / 2,
      Math.min(this.x, GLOBALS.WORLD.width - this.width / 2)
    );

    this.y = this.y + this.#velocity.y * delta;
    this.y = Math.max(
      this.height / 2,
      Math.min(this.y, GLOBALS.WORLD.height - this.height / 2)
    );
  }

  render() {
    GLOBALS.context.translate(this.x, this.y);
    GLOBALS.context.scale(this.#facing, 1);
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
export default Player;
