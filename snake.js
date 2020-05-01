const cvs=document.getElementById("canvas");
const ctx=cvs.getContext("2d");
const box=32;
const ground=new Image();
	ground.src="img/back1.jpg";
const foodImg=new Image();
	foodImg.src="img/food.png";


var snake=[];
snake[0]={
	x:11*box,
	y:9*box
}
var food={
	x:Math.floor(Math.random()*22+2)*box,
	y:Math.floor(Math.random()*16+2)*box
}
var score=0;
var d;

document.addEventListener("keydown",direction);

function direction(event){
	if(event.keyCode==37 && d!="RIGHT"){
		d="LEFT";
	}else if(event.keyCode==38 && d!="DOWN"){
		d="UP";
	}else if(event.keyCode==39 && d!="LEFT"){
		d="RIGHT";
	}else if(event.keyCode==40 && d!="UP"){
		d="DOWN";
	}
}
function collision(head,snake){
	for(var i=0;i<snake.length;i++){
		if(head.x == snake[i].x && head.y == snake[i].y)
			return true;
	}
	return false;
}

function draw(){
	ctx.drawImage(ground,0,0);
	
	ctx.beginPath(); 
	ctx.lineJoin="round";
	ctx.moveTo(80,96);
	ctx.lineTo(190,96);
	ctx.lineTo(190,296);
	
	ctx.lineWidth=5;
	ctx.lineCap='round';
	ctx.stroke();
	
	for(var i=0;i<snake.length;i++){
		ctx.fillStyle=(i==0)?"green":"white";
		ctx.fillRect(snake[i].x,snake[i].y,box,box);

		
	}
	ctx.drawImage(foodImg,food.x,food.y);

	var snakeX=snake[0].x;
	var snakeY=snake[0].y;

	if(d=="LEFT") snakeX -= box;
	if(d=="UP") snakeY -= box;
	if(d=="RIGHT") snakeX += box;
	if(d=="DOWN") snakeY += box;
	
	if(snakeX==food.x && snakeY==food.y){
		score++;
		food={
			x:Math.floor(Math.random()*22+2)*box,
			y:Math.floor(Math.random()*16+2)*box
		}
	}else {
		snake.pop();
	}
	
	var newHead={
		x:snakeX,
		y:snakeY
	}


	if(snakeX < 1*box || snakeX > 23*box || snakeY < 1*box || snakeY > 17*box || collision(newHead,snake) ){
		clearInterval(game);
	}

	

	snake.unshift(newHead);
	ctx.drawImage(foodImg,0,0);
	ctx.fillStyle="black";
	ctx.font="45px Georgia one";
	ctx.fillText(score,1*box,1*box); 
}
var game=setInterval(draw,200);
