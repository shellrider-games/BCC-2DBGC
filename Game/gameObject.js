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
}

export default GameObject;