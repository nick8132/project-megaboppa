window.onload = function() {
    var canvas = document.getElementById("myCanvas");
    var g2d = canvas.getContext("2d");
    g2d.beginPath();
	g2d.rect(0, 0, canvas.width, canvas.height);
	g2d.fillStyle = "black";
	g2d.fill();
	fixlocal();
};
var gamestart = new Audio('stuff/sound-on.mp3');
var wallhit = new Audio('stuff/Hit.wav');
var moving = new Audio('stuff/m.wav');
var press = new Audio('stuff/space.mp3');
var dead = new Audio('stuff/death.mp3');
var winsound = new Audio('stuff/win.mp3');
var end = new Audio('stuff/end.wav');
var jump = new Audio('stuff/jump.wav');
var selected = new Audio('stuff/select.mp3');
selected.volume = 0.2;
end.volume = 0.3;
jump.volume = 0.3;
dead.volume = 0.5;
moving.volume = 0.3;
wallhit.volume = 0.3;
gamestart.volume = 0.2;
press.volume = 0.5;
winsound.volume = 0.5;
var storages=["owned", "wall", "winstreak", "coins"];
var machine = false;
var cooldown = true;
var cooldownd = 1000;
var delay = 0;
var bouncenr = 3;
var layer = 0;
var counter = 2;
var underlinepos = 1;
var stop = false;
var blocks = [];
var goodblocks = [];
var activeblocks = 3;
var activeblocksarr = ["3"];

var onmenu = false;
var ongame = false;
var onroom = false;
var onshop = false;
var gameover = false;

//---------------------
var difficulty = 1.241;
var sadamount = 10;
var coinamount = 10;
//---------------------


function turnon(argument) {
	if(machine){

	}else{
		machine=true;
		sp()
		gamestart.play();
		function sp() {
			if(gamestart.ended == true){
				menu();
				setTimeout(function() {underline(1);window.addEventListener("keydown", keys, false);}, 300);
			}else{
				setTimeout(function() {menu();}, newflick());
				setTimeout(function() {bgoff();sp()}, newflick());
			}
		}
	}
}

function play(){
	bgon()
	game(0, 1000);
}

function shop() {
	onmenu = false;
	ongame = false;
	onroom = false;
	onshop = true;
	gameover = false;
}

function room() {
	onmenu = false;
	ongame = false;
	onroom = true;
	onshop = false;
	gameover = false;
}
function menu() {
	onmenu = true;
	ongame = false;
	onroom = false;
	onshop = false;
	gameover = false;
	var canvas = document.getElementById("myCanvas");
    var g2d = canvas.getContext("2d");
    var img = document.getElementById("bg-off");
    var play_btn = document.getElementById("play_btn");
    var room_btn = document.getElementById("room_btn");
    var shop_btn = document.getElementById("shop_btn");
    g2d.drawImage(img, 0, 0, canvas.width, canvas.height);
    g2d.drawImage(shop_btn, canvas.width/2-(canvas.width/5*4)/2, ((canvas.height/2)/2)*3-((canvas.width/5*4)*0.4169279)/2, canvas.width/5*4, (canvas.width/5*4)*0.4169279);
    g2d.drawImage(room_btn, canvas.width/2-(canvas.width/5*4)/2, canvas.height/2-((canvas.width/5*4)*0.4169279)/2, canvas.width/5*4, (canvas.width/5*4)*0.4169279);
    g2d.drawImage(play_btn, canvas.width/2-(canvas.width/5*4)/2, ((canvas.height/2)/2)-((canvas.width/5*4)*0.4169279)/2, canvas.width/5*4, (canvas.width/5*4)*0.4169279);
}

function newflick() {
	var mydelay = Math.floor(Math.random() * (300 - 100)) + 50;
	return delay+mydelay
}
function bgoff() {
	var canvas = document.getElementById("myCanvas");
    var g2d = canvas.getContext("2d");
    g2d.beginPath();
	g2d.rect(0, 0, canvas.width, canvas.height);
	g2d.fillStyle = "black";
	g2d.fill();
}
function bgon() {
	var canvas = document.getElementById("myCanvas");
    var g2d = canvas.getContext("2d");
    var img = document.getElementById("bg-on");
    g2d.drawImage(img, 0, 0, canvas.width, canvas.height);
}


function game(l, d) {
	onmenu = false;
	ongame = false;
	onroom = false;
	onshop = false;
	gameover = false;
	move(l, d);
	function move(l, d){
		if(stop){
			check(l, d);
		}else{
			counter++
			setTimeout(function() {
				ongame=true;
				clearcanvas();
				bounce(counter);
				if(stop){
				}else{
					if(activeblocks==3){
						lightblock((bouncenr-1), (13-l))
						lightblock((bouncenr-2), (13-l))
						lightblock((bouncenr), (13-l))
						blocks.push(bouncenr-1);
					}else if(activeblocks==2){
						lightblock((bouncenr-1), (13-l));
						lightblock((bouncenr), (13-l))
						blocks.push(bouncenr-1);
					}else if(activeblocks==1){
						lightblock((bouncenr-1), (13-l));
						blocks.push(bouncenr-1);
					}
				}
				move(l, d)
			}, d);
		}
	}
}

function check(l,d) {
	var x = Math.floor((Math.random() * 7) + 1);
	bouncenr=x;
	counter=x-1;
	ongame=false;
	if(goodcheck()){
		stop=false;
		if(l==3&&activeblocks==3){
			activeblocks=2;
		}
		if(l==7&&activeblocks==2){
			activeblocks=1;
		}
		if(l==13){
			win();
		}else{
			var lastblock = blocks.length-1
			drawblocks();
			cooldownd = d/difficulty
			game(layer, d/difficulty)
		}
	}else{
		lost();
	}
}
function drawblocks(argument) {
	for (var i = goodblocks.length - 1; i >= 0; i--) {
		lightblock(goodblocks[i].pos, goodblocks[i].layer)
	}
}
function goodcheck() {
	var lastblock = blocks.length-1
	var lastgoodblock = goodblocks.length-1
	var lca = activeblocksarr.length-1
	var blc = [blocks[lastblock]-1,blocks[lastblock],blocks[lastblock]+1];
	if(layer==1){
		goodblocks.push({pos:blc[0],layer:14-layer},{pos:blc[1],layer:14-layer},{pos:blc[2],layer:14-layer})
		return true;
	}else if(activeblocks==3){
		var lblc = [goodblocks[lastgoodblock-2],goodblocks[lastgoodblock-1],goodblocks[lastgoodblock]];
		var blc = [blocks[lastblock]-1,blocks[lastblock],blocks[lastblock]+1];
		if(blc[1]==lblc[1].pos){
			activeblocksarr.push(activeblocks)
			goodblocks.push({pos:blc[0],layer:14-layer},{pos:blc[1],layer:14-layer},{pos:blc[2],layer:14-layer})
			return true;
		}else if(blc[1]==lblc[0].pos){
			activeblocks=2;
			activeblocksarr.push(activeblocks)
			goodblocks.push({pos:blc[1],layer:14-layer},{pos:blc[2],layer:14-layer})
			return true
		}else if(blc[1]==lblc[2].pos){
			activeblocks=2;
			activeblocksarr.push(activeblocks)
			goodblocks.push({pos:blc[0],layer:14-layer},{pos:blc[1],layer:14-layer})
			return true
		}else if(blc[0]==lblc[2].pos){
			activeblocks=1;
			activeblocksarr.push(activeblocks)
			goodblocks.push({pos:blc[0],layer:14-layer})
			return true;
		}else if(blc[2]==lblc[0].pos){
			activeblocks=1;
			activeblocksarr.push(activeblocks)
			goodblocks.push({pos:blc[2],layer:14-layer})
			return true;
		}else{
			return false;
		}
	}else if(activeblocks==2){
		if(activeblocksarr[lca]==3){
			var lblc = [goodblocks[lastgoodblock-2],goodblocks[lastgoodblock-1],goodblocks[lastgoodblock]];
			var blc = [blocks[lastblock],blocks[lastblock]+1];
			if(blc[0]==lblc[1].pos){
				activeblocks=2;
				activeblocksarr.push(activeblocks)
				goodblocks.push({pos:blc[0],layer:14-layer},{pos:blc[1],layer:14-layer})
				return true;
			}else if(blc[0]==lblc[0].pos){
				activeblocks=2;
				activeblocksarr.push(activeblocks)
				goodblocks.push({pos:blc[0],layer:14-layer},{pos:blc[1],layer:14-layer})
				return true;
			}else if(blc[1]==lblc[0].pos){
				activeblocks=1;
				activeblocksarr.push(activeblocks)
				goodblocks.push({pos:blc[1],layer:14-layer})
				return true;
			}else if(blc[0]==lblc[2].pos){
				activeblocks=1;
				activeblocksarr.push(activeblocks)
				goodblocks.push({pos:blc[0],layer:14-layer})
				return true;
			}else{
				return false;
			}
		}else if(activeblocksarr[lca]==2){
			var lblc = [goodblocks[lastgoodblock-1],goodblocks[lastgoodblock]];
			var blc = [blocks[lastblock],blocks[lastblock]+1];
			if(blc[0]==lblc[0].pos){
				activeblocks=2;
				activeblocksarr.push(activeblocks)
				goodblocks.push({pos:blc[0],layer:14-layer},{pos:blc[1],layer:14-layer})
				return true;
			}else if(blc[0]==lblc[1].pos){
				activeblocks=1;
				activeblocksarr.push(activeblocks)
				goodblocks.push({pos:blc[0],layer:14-layer})
				return true;
			}else if(blc[1]==lblc[0].pos){
				activeblocks=1;
				activeblocksarr.push(activeblocks)
				goodblocks.push({pos:blc[1],layer:14-layer})
				return true;
			}else{
				return false;
			}
		}
	}else if(activeblocks==1){
		if(activeblocksarr[lca]==3){
			var lblc = [goodblocks[lastgoodblock-2],goodblocks[lastgoodblock-1],goodblocks[lastgoodblock]];
			var blc = blocks[lastblock];
			if(blc==lblc[0].pos){
				activeblocks=1;
				activeblocksarr.push(activeblocks)
				goodblocks.push({pos:blc,layer:14-layer})
				return true;
			}else if(blc==lblc[1].pos){
				activeblocks=1;
				activeblocksarr.push(activeblocks)
				goodblocks.push({pos:blc,layer:14-layer})
				return true;
			}else if(blc=lblc[2].pos){
				activeblocks=1;
				activeblocksarr.push(activeblocks)
				goodblocks.push({pos:blc,layer:14-layer})
				return true;
			}else{
				return false;
			}
		}else if(activeblocksarr[lca]==2){
			var lblc = [goodblocks[lastgoodblock-1],goodblocks[lastgoodblock]];
			var blc = blocks[lastblock];
			if(blc==lblc[0].pos){
				activeblocks=1;
				activeblocksarr.push(activeblocks)
				goodblocks.push({pos:blc,layer:14-layer})
				return true;
			}else if(blc==lblc[1].pos){
				activeblocks=1;
				activeblocksarr.push(activeblocks)
				goodblocks.push({pos:blc,layer:14-layer})
				return true;
			}else{
				return false;
			}
		}else if(activeblocksarr[lca]==1){
			var lblc = goodblocks[lastgoodblock];
			var blc = blocks[lastblock];
			if(blc==lblc.pos){
				activeblocks=1;
				activeblocksarr.push(activeblocks)
				goodblocks.push({pos:blc,layer:14-layer})
				return true;
			}else{
				return false;
			}
		}
	}else{
		return false;
	}
}


function select(a) {
	selected.play();
	if(a==1){
		play();
	}else if(a==2){
		shop();
	}else if(a==3){
		room();
	}else if(a==4){
		resetgame();
		play();
	}else if(a==5){
		underlinepos = 1;
		resetgame();
		menu();
		underline(underlinepos);
	}
}

function cooldownf() {
	cooldown = false;
	setTimeout(function() {
		cooldown = true;
	}, cooldownd);
}
function keys(e) {
    if (e.keyCode == "32" || e.keyCode == "13") {//Space //Enter
    	if(ongame){
    		if(cooldown){
    			cooldownf();
    			press.currentTime = 0;
    			press.play();
    			clearcanvas()
        		layer++
        		stop=true;
    		}
    	}else if(onmenu){
    		select(underlinepos)
    	}else if(gameover){
    		select(underlinepos)
    	}
    }
    if (e.keyCode == "38" || e.keyCode == "87") {//ArrowUp //KeyW
    	if(onmenu){
    		if(underlinepos==1){
    			end.currentTime = 0;
    			end.play();
    		}else{
    			jump.currentTime = 0;
    			jump.play();
    		}
    		if(underlinepos>1){
    			underlinepos--
    			underline(underlinepos)
    		}
    	}else if(gameover){
    		if(underlinepos==4){
    			end.currentTime = 0;
    			end.play();
    		}else{
    			jump.currentTime = 0;
    			jump.play();
    		}
    		if(underlinepos>4){
    			underlinepos--
    			underline(underlinepos)
    		}
    	}
    }
    if (e.keyCode == "40" || e.keyCode == "83") {//ArrowDown //KeyS
    	if(onmenu){
    		if(underlinepos==3){
    			end.currentTime = 0;
    			end.play();
    		}else{
    			jump.currentTime = 0;
    			jump.play();
    		}
    		if(underlinepos<3){
    			underlinepos++
    			underline(underlinepos)
    		}
    	}else if(gameover){
    		if(underlinepos==5){
    			end.currentTime = 0;
    			end.play();
    		}else{
    			jump.currentTime = 0;
    			jump.play();
    		}if(underlinepos<5){
    			underlinepos++
    			underline(underlinepos)
    		}
    	}
    }
}


function underline(a) {
	var canvas = document.getElementById("myCanvas");
    var g2d = canvas.getContext("2d");
    var img = document.getElementById("underline_btn");
    var menu_btn = document.getElementById("menu_btn");
    var play_btn = document.getElementById("play_btn")
	if(a==1){
		menu();
		g2d.drawImage(img, canvas.width/2-(canvas.width/5*4)/2, ((canvas.height/2)/2)-((canvas.width/5*4)*0.4169279)/2, canvas.width/5*4, (canvas.width/5*4)*0.4169279);
	}else if(a==2){
		menu();
		g2d.drawImage(img, canvas.width/2-(canvas.width/5*4)/2, canvas.height/2-((canvas.width/5*4)*0.4169279)/2, canvas.width/5*4, (canvas.width/5*4)*0.4169279);
	}else if(a==3){
		menu();
		g2d.drawImage(img, canvas.width/2-(canvas.width/5*4)/2, ((canvas.height/2)/2)*3-((canvas.width/5*4)*0.4169279)/2, canvas.width/5*4, (canvas.width/5*4)*0.4169279);
	}else if(a==4){
		g2d.drawImage(play_btn, canvas.width/2-(canvas.width/5*4)/2, (canvas.height/3)-((canvas.width/5*4)*0.4169279)/2, canvas.width/5*4, (canvas.width/5*4)*0.4169279);
		g2d.drawImage(menu_btn, canvas.width/2-(canvas.width/5*4)/2, (canvas.height/3*2)-((canvas.width/5*4)*0.4169279)/2, canvas.width/5*4, (canvas.width/5*4)*0.4169279);
		g2d.drawImage(img, canvas.width/2-(canvas.width/5*4)/2, (canvas.height/3)-((canvas.width/5*4)*0.4169279)/2, canvas.width/5*4, (canvas.width/5*4)*0.4169279);
	}else if(a==5){
		g2d.drawImage(play_btn, canvas.width/2-(canvas.width/5*4)/2, (canvas.height/3)-((canvas.width/5*4)*0.4169279)/2, canvas.width/5*4, (canvas.width/5*4)*0.4169279);
		g2d.drawImage(menu_btn, canvas.width/2-(canvas.width/5*4)/2, (canvas.height/3*2)-((canvas.width/5*4)*0.4169279)/2, canvas.width/5*4, (canvas.width/5*4)*0.4169279);
		g2d.drawImage(img, canvas.width/2-(canvas.width/5*4)/2, (canvas.height/3*2)-((canvas.width/5*4)*0.4169279)/2, canvas.width/5*4, (canvas.width/5*4)*0.4169279);
	}
}
function lightblock(x,y) {
	var canvas = document.getElementById("myCanvas");
    var g2d = canvas.getContext("2d");
    var img = document.getElementById("block");
    g2d.drawImage(img, (canvas.width/7)*x, (canvas.height/14)*y, (canvas.width/7), (canvas.height/14));
}

function clearcanvas() {
	var canvas = document.getElementById("myCanvas");
    var g2d = canvas.getContext("2d");
    g2d.clearRect(0, 0, canvas.width, canvas.height);
    bgon();
}

function lost(){
	localStorage.setItem("winstreak", 0)
	dead.play();
	var fall = 0
	falling();
	function falling() {
		if(fall<=sadamount*8.4){
			clearcanvas();
			sad(fall);
			fall++
			setTimeout(function() {
				falling()
			}, 50);
		}else{
			gameend();
		}
	}
}

function win(){
	var wss = localStorage.getItem("winstreak")
	if(wss==""){
		localStorage.setItem("winstreak", 1)
	}else{
		localStorage.setItem("winstreak", (parseInt(wss)+1));
	}
	if(goodblocks.length >= 16){
		var coins = localStorage.getItem("coins")
		if(coins==""){
			console.log("omg this is your first win!!")
		}else{
			localStorage.setItem("winstreak", coins+(50*wss));
		}
	}
	winsound.play();
	var fall = 0
	falling()
	function falling() {
		if(fall<=coinamount*10.4){
			clearcanvas();
			coin(fall);
			fall++
			setTimeout(function() {
				falling()
			}, 50);
		}else{
			gameend();
		}
	}
}


function sad(a) {
	a=a+6;for(i=0;i<sadamount;i++){a=a-6;lightblock(2,a-4);lightblock(4,a-4);lightblock(2,a-3);lightblock(4,a-3);lightblock(2,a-1);lightblock(3,a-1);lightblock(4,a-1);lightblock(1,a);lightblock(5,a);}
}

function coin(a) {
	a=a+8;for(i=0;i<coinamount;i++){a=a-8;lightblock(2,a-6);lightblock(3,a-6);lightblock(4,a-6);lightblock(1,a-5);lightblock(5,a-5);lightblock(1,a-4);lightblock(3,a-4);lightblock(5,a-4);lightblock(1,a-3);lightblock(3,a-3);lightblock(5,a-3);lightblock(1,a-2);lightblock(3,a-2);lightblock(5,a-2);lightblock(1,a-1);lightblock(5,a-1);lightblock(2,a);lightblock(3,a);lightblock(4,a);}
}

function bounce(a) {
	drawblocks();
	if(a>6){
		bouncenr--
		if(a==12){
			counter=0
		}
	}else{
		bouncenr++
	}
	if(a == 6 || a == 12){
		wallhit.currentTime = 0;
		wallhit.play();
	}else{
		moving.currentTime = 0;
		moving.play();
	}
}

function resetgame(){
	cooldownd = 1000;
	bouncenr=3;
	layer=0;
	counter=2;
	underlinepos=1;
	stop=false;
	blocks=[];
	goodblocks=[];
	activeblocks=3;
	activeblocksarr=["3"];
}

function drawlastgame() {
	underlinepos=4;
	onmenu = false;
	ongame = false;
	onroom = false;
	onshop = false;
	gameover = true;
	var dr = 0;
	drawing();
	function drawing() {
		if(gameover){
			underline(underlinepos)
			if(dr==goodblocks.length){
				dr=0
				setTimeout(function() {clearcanvas();drawing();}, 3000);
			}else{
				setTimeout(function() {
					if(gameover){
						clearcanvas();
						for (i = 0; i < dr; i++) {
							lightblock(goodblocks[i].pos,goodblocks[i].layer)
						}
						if (dr>1) {
							press.currentTime = 0;
    						press.play();
						}
						dr++
						drawing();
					}
				}, 600);
			}
		}else{
		}
	}
}

function gameend() {
	drawlastgame();
}

function log(argument) {
	console.log("ongame: " + ongame);
	console.log("onmenu: " + onmenu);
	console.log("onshop: " + onshop);
	console.log("onroom: " + onroom);
	console.log("gameover: "+ gameover);
}

function fixlocal(){
	for (var i = storages.length - 1; i >= 0; i--) {
		if(localStorage.getItem(storages[i])==null){
			localStorage.setItem(storages[i], "");
		}
	}
}
