const cvs=document.getElementById("canvas");
const ctx=cvs.getContext("2d");
const box=32;
const maze=10;
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

function coll_maze1(head){
	for(var i=1;i<7;i++){
		if( (head.x == (box*i)) && (head.y == (box*4)) )
			return true;
	}
	return false;
}

function coll_maze2(head){
	for(var i=18;i<24;i++){
		if(head.x == (box*i) && head.y == (box*15))
			return true;
	}
	return false;
}

function coll_maze3(head){
	for(var i=9;i<16;i++){
		if(head.x == (box*6) && head.y == (box*i))
			return true;
	}
	return false;
}

function coll_maze4(head){
	for(var i=1;i<7;i++){
		if(head.x == (box*15) && head.y == (box*i))
			return true;
	}
	return false;
}

function draw(){
	ctx.drawImage(ground,0,0);
	
	for(var i=1;i<7;i++)
		ctx.fillRect(box*i,box*4,box,box);

	for(var i=18;i<24;i++)
		ctx.fillRect(box*i,box*15,box,box);

	for(var i=9;i<16;i++)
		ctx.fillRect(box*6,box*i,box,box);

	for(var i=1;i<7;i++)
		ctx.fillRect(box*15,box*i,box,box);

	for(var i=0;i<snake.length;i++){
		ctx.fillStyle=(i==0)?"green":"red";
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

	var flag=1;
	if(snakeX < 1*box || snakeX > 23*box || snakeY < 1*box || snakeY > 17*box || collision(newHead,snake) || coll_maze1(newHead) || coll_maze2(newHead) || coll_maze3(newHead) || coll_maze4(newHead) ){
		flag=0;
		
		
	}
	if(flag==0){
		
		clearInterval(game);
	}
	

	snake.unshift(newHead);
	ctx.drawImage(foodImg,0,0);
	ctx.fillStyle="black";
	ctx.font="45px Georgia one";
	ctx.fillText(score,1*box,1*box); 
}
const delay=210;
//var game=setInterval(draw,delay);

var fast=document.getElementById("fast");
var medium=document.getElementById("medium");
var slow=document.getElementById("slow");

fast.onclick=function(){
	const fast=delay/3;
	console.log(delay);
	game=setInterval(draw,fast);
	console.log(fast);
}

medium.onclick=function(){
	const med=delay/1.5;
	console.log(delay);
	game=setInterval(draw,med);
	console.log(med);
}

slow.onclick=function(){
	const slow=delay/1;
	console.log(slow);
	game=setInterval(draw,slow);
	console.log(delay);
}

console.log(delay);

