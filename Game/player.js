import GLOBALS from "./globalStorage.js";
import GameObject from "./gameObject.js";

class Player extends GameObject {
  #velocity;
  #facing;
  #speed;
  image;
  #currentKeys = {};
  sprites;
  animationstate;

  init() {
    const preventDefaultArray = ["ArrowUp", "ArrowRight", "ArrowDown", "ArrowLeft"];
      document.addEventListener("keydown", (event) => {
      if(preventDefaultArray.includes(event.code)){
        console.log("prevented");
        event.preventDefault();
      }
      this.#currentKeys[event.code] = true;
    });
    document.addEventListener("keyup", (event) => {
      this.#currentKeys[event.code] = false;
    });

    this.sprites = {
      run: {
        src: './run-sprite.png',
        frames: 8,
        fps: 16,
        image: null,
        frameSize: {
          width: 400,
          height: 400,
        },
      },
      idle: {
        src: './idle-sprite.png',
        frames: 10,
        fps: 16,
        image: null,
        frameSize: {
          width: 400,
          height: 400,
        },
      },
    }

    for (let sprite in this.sprites){
      this.sprites[sprite].image = new Image();
      this.sprites[sprite].image.src = this.sprites[sprite].src;
    }

  }

  constructor(x = 0, y = 0, width = 100, height = 100) {
    super(x,y,width,height);
    this.#speed = 0.25;
    this.#velocity = { x: 0, y: 0 };
    this.#facing = 1;
    this.animationstate = "idle";
    this.init();
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

  currentSpeedFactor () {
    if (typeof this.#currentKeys["Space"] === "boolean" && this.#currentKeys["Space"]){
      return 1.5;
    }
    return 1;
  }

  update(delta) {
    let velocity = this.getInputVector();
    const directionValue = Math.sqrt(velocity[0] ** 2 + velocity[1] ** 2);
    if (directionValue) {
      velocity[0] /= directionValue;
      velocity[1] /= directionValue;
    }
    this.#velocity.x = velocity[0] * this.#speed * this.currentSpeedFactor();
    this.#velocity.y = velocity[1] * this.#speed * this.currentSpeedFactor();
    if (this.#velocity.x < 0) {
      this.#facing = -1;
    }
    if (this.#velocity.x > 0) {
      this.#facing = 1;
    }
    if (this.#velocity.x === 0 && this.#velocity.y === 0) {
      this.animationstate = "idle";
    } else {
      this.animationstate = "run";
    }
    this.x = this.x + this.#velocity.x * delta;
    this.x = Math.max(
      this.width / 2 - 20,
      Math.min(this.x, GLOBALS.WORLD.width - this.width / 2 + 20)
    );

    this.y = this.y + this.#velocity.y * delta;
    this.y = Math.max(
      this.height / 2 - 5,
      Math.min(this.y, GLOBALS.WORLD.height - this.height / 2 + 5)
    );
  }

  render() {
    GLOBALS.context.translate(this.x, this.y);
    GLOBALS.context.scale(this.#facing, 1);

    
    const coords = this.getImageSpriteCoordinates(this.sprites[this.animationstate]);

    GLOBALS.context.drawImage(
      this.sprites[this.animationstate].image,
      coords.sourceX,
      coords.sourceY,
      coords.sourceWidth,
      coords.sourceHeight,
      -this.width / 2,
      -this.height / 2,
      this.width,
      this.height
    );
    GLOBALS.context.resetTransform();
  }

  getImageSpriteCoordinates(sprite){
    const frameX = Math.floor(performance.now()/1000 * sprite.fps % sprite.frames);

    const coords = {
      sourceX: frameX * sprite.frameSize.width,
      sourceY: 0,
      sourceWidth: sprite.frameSize.width,
      sourceHeight: sprite.frameSize.height,
    }
    return coords;
  }

  getBoundingBox() {
    return {
        x: this.x - this.width/2 + 20,
        y: this.y - this.height/2 + 5,
        w: this.width-40,
        h: this.height-10
    }
}
}
export default Player;
