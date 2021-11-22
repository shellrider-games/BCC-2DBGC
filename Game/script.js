//global variables
let context;
let ticks;
let lastTimestamp;

const square = {
  x: 0,
  velocity: 0.2,
};
const CONFIG = {
  canvasWidth: 800,
  canvasHeight: 600,
};

function render() {
  context.clearRect(0, 0, CONFIG.canvasWidth, CONFIG.canvasHeight);
  context.fillRect(0 + square.x, 0, 50, 50);
  context.fillText(`Ticks: ${ticks}`, CONFIG.canvasWidth-8, CONFIG.canvasHeight-8);
}

function update(timestamp = performance.now()) {
  const delta = timestamp - lastTimestamp;
  console.log(delta);
  ticks++;
  if (delta) {
    square.x += square.velocity * delta;
    if (square.x >= CONFIG.canvasWidth) {
      square.x = 0;
    }
    render();
    lastTimestamp = timestamp;
  }
  requestAnimationFrame(update);
}

function setFontProperties(){
    context.font = '20px sans-serif';
    context.textAlign = 'right';
}

function setCanvasSizeToConfig(canvas) {
  canvas.setAttribute("width", CONFIG.canvasWidth);
  canvas.setAttribute("height", CONFIG.canvasHeight);
}

function initGame() {
  const canvas = document.querySelector("#gameCanvas");
  context = canvas.getContext("2d");
  setCanvasSizeToConfig(canvas);
  setFontProperties(canvas);
  lastTimestamp = performance.now();
  ticks = 0;
  requestAnimationFrame(update);
}

window.addEventListener("load", () => {
  initGame();
});
