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

  render() {}

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