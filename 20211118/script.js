const canvas = document.querySelector('#gameCanvas');
const ctx = canvas.getContext('2d');


ctx.beginPath();
ctx.moveTo(200,50);
ctx.lineTo(200,200);
ctx.lineTo(400,200);
ctx.closePath();
ctx.lineWidth = 16;
ctx.stroke();

ctx.beginPath()
ctx.moveTo(50, 300);
ctx.lineTo(50, 400);
ctx.moveTo(100,300);
ctx.lineTo(100, 400);
ctx.lineWidth = 10;
ctx.stroke();
