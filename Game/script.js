import Player from "./player.js";
import GLOBALS from "./globalStorage.js";

//variables
let canvas;
let ticks;
let lastTimestamp;

const CONFIG = {
  canvasWidth: 800,
  canvasHeight: 600,
};

let player;

function render() {
  GLOBALS.context.clearRect(0, 0, CONFIG.canvasWidth, CONFIG.canvasHeight);
  player.render();
}

function update(delta) {
  if (typeof delta === "number" && delta > 0) {
    player.update(delta);
  }
}

function gameLoop() {
  let timestamp = performance.now();
  const delta = timestamp - lastTimestamp;
  lastTimestamp = timestamp;
  ticks++;
  update(delta);
  render();
  requestAnimationFrame(gameLoop);
}

function setFontProperties() {
  GLOBALS.context.font = "20px sans-serif";
  GLOBALS.context.textAlign = "right";
}

function setCanvasSizeToConfig(canvas) {
  canvas.setAttribute("width", CONFIG.canvasWidth);
  canvas.setAttribute("height", CONFIG.canvasHeight);

  GLOBALS.WORLD.width = CONFIG.canvasWidth;
  GLOBALS.WORLD.heigth = CONFIG.canvasHeight;
}

function initGame() {
  canvas = document.querySelector("#gameCanvas");
  GLOBALS.context = canvas.getContext("2d");
  player = new Player(100, 100);
  player.init();
  ticks = 0;
  lastTimestamp = performance.now();
  setCanvasSizeToConfig(canvas);
  setFontProperties();
  requestAnimationFrame(gameLoop);
}

window.addEventListener("load", () => {
  initGame();
});
