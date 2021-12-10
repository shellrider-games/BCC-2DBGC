import { randomNumberBetween } from "./toolBox.js";

class RandomDispatcher {
  constructor(callback, options) {

    if(typeof callback !== 'function') throw Error('Callback must be a function');

    this.callback = callback;
    this.options = options;
    this.loop();
  }

  loop() {
    setTimeout(() => {
      this.callback();
      this.loop();
    }, randomNumberBetween(this.options.min, this.options.max));
  }
}
export default RandomDispatcher;
