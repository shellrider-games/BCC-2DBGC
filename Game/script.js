import Player from "./player.js";
import Collectible from "./collectible.js";
import RandomDispatcher from "./randomDispatcher.js";
import GLOBALS from "./globalStorage.js";
import { randomNumberBetween } from "./toolBox.js";

//variables
let canvas;
let ticks;
let lastTimestamp;

const CONFIG = {
  canvasWidth: 800,
  canvasHeight: 600,
};

let player;
let gameObjects = [];
let collectibles = [];

function render() {
  GLOBALS.context.clearRect(0, 0, CONFIG.canvasWidth, CONFIG.canvasHeight);
  [...gameObjects].reverse().forEach(function (gameObject) {
    gameObject.render();
  });
}

function update(delta) {
  if (typeof delta === "number" && delta > 0) {
    gameObjects.forEach(function (gameObject) {
      gameObject.update(delta);
    });
  }
  let removeItems = [];
  collectibles.forEach((collectible) => {
    if (checkCollisionBetween(player, collectible))
      removeItems.push(collectible);
  });

  removeItems.forEach((collectible) => {
    collectibles.splice(collectibles.indexOf(collectible), 1);
    gameObjects.splice(gameObjects.indexOf(collectible), 1);
  });
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
  player = new Player(100, 100);
  gameObjects.push(player);
  ticks = 0;
  lastTimestamp = performance.now();
  setCanvasSizeToConfig(canvas);
  setFontProperties();

  let randomDispatcher = new RandomDispatcher(
    function () {
      let mouse = new Collectible(
        randomNumberBetween(25, GLOBALS.WORLD.width - 25),
        randomNumberBetween(25, GLOBALS.WORLD.height - 25)
      );
      gameObjects.push(mouse);
      collectibles.push(mouse);
    },
    { min: 1000, max: 6000 }
  );

  requestAnimationFrame(gameLoop);
}

function checkCollisionBetween(gameObjectA, gameObjectB) {
  let bbA = gameObjectA.getBoundingBox();
  let bbB = gameObjectB.getBoundingBox();
  return (
    bbA.x < bbB.x + bbB.w &&
    bbA.x + bbA.w > bbB.x &&
    bbA.y < bbB.y + bbB.h &&
    bbA.y + bbA.h > bbB.y
  );
}

window.addEventListener("load", () => {
  initGame();
});
