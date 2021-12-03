import GLOBALS from "./globalStorage.js";
class Player {
    #x;
    #y;
    #velocity;

    constructor(x = 0, y = 0) {
      this.#x = x;
      this.#y = y;
      this.#velocity = 0.25;
    }
  
    update(delta) {
      this.#x = (this.#x + this.#velocity*delta) % GLOBALS.WORLD.width;
      this.#y = (this.#y + this.#velocity*delta) % GLOBALS.WORLD.heigth;
    }
  
    render() {
      GLOBALS.context.translate(this.#x, this.#y);
      GLOBALS.context.fillRect(-25, -25, 50, 50);
      GLOBALS.context.resetTransform();
    }
}
export default Player;