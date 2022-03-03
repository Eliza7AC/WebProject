/*
 * 2D Game - casse brique
 */


/*******************
 ****** SCORE *******
 ********************/

let score = 0


function incrementScore() {
  score += 1;
  // document.getElementById("scoreResult").innerText =
  //   "Score: " + score;
}
var cancel = setInterval(incrementScore, 100);



/*******************
 ***** EVENTS ******
 ********************/

document.addEventListener("keydown", keyDownHandler,false);
document.addEventListener("keyup",keyUpHandler,false);

function keyDownHandler(e){
  if (e.key == "Right" || e.key == "ArrowRight"){ // Right = IE/Edge
    rightPressed = true;
  }
  else if (e.key == "Left" || e.key == "ArrowLeft"){ // Left = IE/Edge
    leftPressed = true;
  }
}

function keyUpHandler(e){
  if (e.key == "Right" || e.key == "ArrowRight"){
    rightPressed = false;
  }
  else if(e.key == "Left" || e.key == "ArrowLeft"){
    leftPressed = false;
  }
}



/*******************
 ****** CANVAS *****
 ********************/

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");


/*******************
 ****** BALL *******
 ********************/

const colorBall = getRandomColor();
var x = canvas.width/2;
var y = canvas.height-30;
var dx = 2;
var dy = -2;
var ballRadius = 10;

function drawBall(){
  ctx.beginPath();
  ctx.arc(x, y, ballRadius,0, Math.PI*2);
  ctx.fillStyle = colorBall;
  ctx.fill();
  ctx.closePath();
}


/*******************
 ***** PADDLE ******
 ********************/

const colorPaddle = getRandomColor();
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width-paddleWidth)/2;
var leftPressed = false;
var rightPressed = false;

function drawPaddle(){
  ctx.beginPath();
  ctx.rect(paddleX,canvas.height-paddleHeight,paddleWidth,paddleHeight);
  ctx.fillStyle = colorPaddle;
  ctx.fill();
  ctx.closePath();
}


/*******************
 ***** BRICKS ******
 ********************/

var brickRowCount = 3;
var brickColumnCount = 5;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;



// aux function

function getRandomColor(){
  return "#"+Math.floor(Math.random()*16777215).toString(16);
}


/*******************
 ****** MAIN *******
 ********************/

function draw(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  drawBall();
  drawPaddle();
  x += dx;
  y += dy;

  // ball motion
  if (x + dx < ballRadius || x + dx > canvas.width-ballRadius){
    dx = -dx;
  }
  if (y + dy < ballRadius){ // if top is touched
    dy = -dy;
  }
  else if (y + dy > canvas.height-ballRadius){ // if bottom is touched
    if (x > paddleX && x < paddleX + paddleWidth){ // if the ball is going to touch the paddle
      dy = -dy;
    }
    else{
      alert("GAME OVER");
      document.location.reload();
      clearInterval(interval);
    }
  }

  // ### PADDLE
  if (rightPressed){
    paddleX += 6;
    if (paddleX < 0){
      paddleX = 0;
    }
  }
  if (leftPressed){
    paddleX -= 6;
    if (paddleX > canvas.width-paddleWidth){
      paddleX = canvas.width - paddleWidth;
    }
  }
}



var interval = setInterval(draw,10);
