import GLOBALS from "./globalStorage.js";

class GameObject {
  x;
  y;
  width;
  height;

  constructor(x, y, width, height) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      this.init();
  }

  init() {

  }

  update() {}

  render() {
      if (GLOBALS.debug) {
        const bb = this.getBoundingBox();
        GLOBALS.context.translate(bb.x, bb.y);
        GLOBALS.context.strokeStyle = "magenta";
        GLOBALS.context.strokeRect(0,0, bb.w, bb.h);
        GLOBALS.context.resetTransform();
      }
  }

  getBoundingBox() {
      return {
          x: this.x - this.width/2,
          y: this.y - this.height/2,
          w: this.width,
          h: this.height
      }
  }
}

export default GameObject;