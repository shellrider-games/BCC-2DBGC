const canvas = document.querySelector('#gameCanvas');
const ctx = canvas.getContext('2d');

context.strokeStyle = "black";
context.fillStyle = "beige";
context.lineWidth = 10;

//arc
context.beginPath();
context.arc(canvas.clientWidth/2,canvas.clientHeight/2,100,0,Math.PI);
context.fill();
context.stroke();

//ellipse
context.fillStyle = "red";

context.beginPath();
context.ellipse(canvas.clientWidth/2,150,150,100,0,0,2 * Math.PI);
context.fill();
context.stroke();

//text

context.fillStyle = "black";
context.font = "bold 22px sans-serif";
context.fillText("2D Browser Game Coding is awesome",60,400);
context.fillStyle = "red";
context.fillText("2D Browser Game Coding is awesome",59,399);

//my first name

context.fillStyle = "white";
context.lineWidth = 8; 
context.font = "bold 170px sans-serif";
context.fillText("Georg",5,150);
context.strokeText("Georg",5,150);
