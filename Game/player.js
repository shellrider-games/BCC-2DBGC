import GLOBALS from "./globalStorage.js";
class Player {
  #x;
  #y;
  #width;
  #height;
  #velocity;
  #facing;
  #speed;
  #image;
  #currentKeys = {};

  constructor(x = 0, y = 0, width = 100, heigth = 100) {
    this.#x = x;
    this.#y = y;
    this.#width = width;
    this.#height = heigth;
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

  init() {
    document.addEventListener("keydown", (event) => {
      this.#currentKeys[event.code] = true;
    });
    document.addEventListener("keyup", (event) => {
      this.#currentKeys[event.code] = false;
    });
    this.#image = new Image();
    this.#image.src = "./run-still.png";
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
    this.#x = (this.#x + this.#velocity.x * delta) % GLOBALS.WORLD.width;
    if (this.#x < 0) {
      this.#x += GLOBALS.WORLD.width;
    }
    this.#y = (this.#y + this.#velocity.y * delta) % GLOBALS.WORLD.heigth;
    if (this.#y < 0) {
      this.#y += GLOBALS.WORLD.heigth;
    }
  }

  render() {
    GLOBALS.context.translate(this.#x, this.#y);
    GLOBALS.context.scale(this.#facing, 1);
    GLOBALS.context.drawImage(
      this.#image,
      -this.#width / 2,
      -this.#height / 2,
      this.#width,
      this.#height
    );
    GLOBALS.context.resetTransform();
  }
}
export default Player;
