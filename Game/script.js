import Player from "./player.js";
import Collectible from "./collectible.js";
import GLOBALS from "./globalStorage.js";

//variables
let canvas;
let ticks;
let lastTimestamp;

const CONFIG = {
  canvasWidth: 800,
  canvasHeight: 600,
};

let gameObjects = [];

function render() {
  GLOBALS.context.clearRect(0, 0, CONFIG.canvasWidth, CONFIG.canvasHeight);
  gameObjects.forEach(function(gameObject){
    gameObject.render();
  });
}

function update(delta) {
  if (typeof delta === "number" && delta > 0) {
    gameObjects.forEach(function(gameObject){
      gameObject.update(delta);
    });
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
  GLOBALS.WORLD.height = CONFIG.canvasHeight;
}

function initGame() {
  canvas = document.querySelector("#gameCanvas");
  GLOBALS.context = canvas.getContext("2d");
  let player = new Player(100, 100);
  player.init();
  gameObjects.push(player);
  let mouse = new Collectible(250, 250);
  mouse.init();
  gameObjects.push(mouse);
  ticks = 0;
  lastTimestamp = performance.now();
  setCanvasSizeToConfig(canvas);
  setFontProperties();
  requestAnimationFrame(gameLoop);
}

window.addEventListener("load", () => {
  initGame();
});
