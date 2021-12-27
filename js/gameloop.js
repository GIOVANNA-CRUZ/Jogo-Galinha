var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 500;
canvas.height = 500;
document.body.appendChild(canvas); 

var bgReady = false;
var bgImage = new Image();
bgImage.onload = function(){
	bgReady = true;
}
bgImage.src = "image/fundo.png";
bgImage.src = "image/fundo.png";

var heroiReady = false;
var heroiImage = new Image();
heroiImage.onload = function(){
	heroiReady = true;
}
heroiImage.src = "image/leao-Recuperado.png";

var monstroReady = false;
var monstroImage = new Image();
monstroImage.onload = function(){
	monstroReady = true;
}
monstroImage.src = "image/galinha.png";

var hero = {
	speed: 256
};

var monstro = {};

var monstrosCapturados = 0;

var teclaApertada = {};

addEventListener("keydown", function(e){
	teclaApertada[e.keyCode] = true;
},false);

addEventListener("keyup", function(e){
	delete teclaApertada[e.keyCode];
},false);

var reset = function(){
	hero.x = canvas.width/2;
	hero.y = canvas.height/2;
	
	monstro.x = 32 + (Math.random() * (canvas.width - 64));
	monstro.y = 32 + (Math.random() * (canvas.height - 64));
};

var update = function(modifier){
	if(38 in teclaApertada){
		hero.y -= hero.speed * modifier;
	}
	if(40 in teclaApertada){
		hero.y += hero.speed * modifier;
	}
	if(37 in teclaApertada){
		hero.x -= hero.speed * modifier;
	}
	if(39 in teclaApertada){
		hero.x += hero.speed * modifier;
	}
	
	if(hero.x <= (monstro.x + 32)&& monstro.x <= (hero.x + 32)&& hero.y <= (monstro.y + 32) && monstro.y <= (hero.y + 32)){
		++monstrosCapturados;
		reset();
	}
};

var render = function(){
	if(bgReady){
		ctx.drawImage(bgImage, 0, 0);
	}
	if(heroiReady){
		ctx.drawImage(heroiImage, hero.x, hero.y);
	}
	if(monstroReady){
		ctx.drawImage(monstroImage, monstro.x, monstro.y);
	}
	
	ctx.fillStyle = "rgb(0,0,0)";
	ctx.font = "22px verdana";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText("Monstros capturados: " + monstrosCapturados, 32, 32);
};

var main = function(){
	var now = Date.now();
	var delta = now - then;
	update(delta / 1000);
	render();
	then = now;
};

reset();
var then = Date.now();
setInterval(main, 1);