//on load le canvas
const canvas = document.getElementById('bomber');
const context = canvas.getContext('2d');


//donner la couleur et afficher
context.fillStyle = "#693647"; //violet
context.fillRect(0, 0, canvas.width, canvas.height);


//les obstacles en forme de tableau 
/* 0 --> vide
   1 --> obstacle non destructible
   2 --> obstacle destructibe
   3 --> bomb
  */
const obstacleMatrix = [
	[0, 0, 2, 0, 0, 0, 2, 0, 0, 0],
	[0, 1, 1, 1, 2, 0, 1, 0, 0, 0],
	[2, 0, 0, 1, 0, 0, 1, 0, 0, 0],
	[1, 0, 0, 2, 0, 0, 0, 0, 0, 0],
	[1, 0, 0, 0, 2, 1, 1, 2, 2, 1],
	[1, 1, 1, 2, 1, 0, 0, 1, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
	[2, 1, 0, 1, 1, 0, 0, 2, 0, 0],
	[0, 1, 2, 0, 1, 0, 0, 1, 0, 0],
	[0, 0, 0, 2, 1, 0, 0, 1, 0, 0],
];


//pour pouvoir afficher à la bonne taille
//il suffit de changer les cases du tableau et la taille change automatiquement
//le canvas est carré donc il faut un tableau carré aussi
tailleObstacle = canvas.width/obstacleMatrix.length;
context.scale(tailleObstacle, tailleObstacle)


//dessine les obstacles
function drawObstacles(matrix) { //et bombes
	matrix.forEach((row, y) => {
		row.forEach((value, x) => {
			if (value != 0) {
				if (value == 1) {
					context.fillStyle = 'lightblue';
					context.fillRect(x, y, 1, 1);
				}
				else if (value == 2) {
					context.fillStyle = '#568cb3';
					context.fillRect(x, y, 1, 1);
				}
				else { //pour dessiner les bombs
					context.beginPath();
					context.arc(x+0.5, y+0.5, 0.1, 0, 2 * Math.PI, false);
					context.fillStyle = 'black';
					context.fill();
				}
			}
		});
	});
}


//le joueur avec une position et des bombs
var player = {
	position: {x: 9.5, y: 0.5}, //position initiale
	bomb: true,
	alive: true,
	color: "pink",
}
var bot1 = {
	position: {x: 0.5, y: 0.5}, //position initiale
	bomb: true,
	alive: true,
	color: "#ffff66",
}
var bot2 = {
	position: {x: 0.5, y: 9.5}, //position initiale
	bomb: true,
	alive: true,
	color: "#cc99ff",
}
var bot3 = {
	position: {x: 9.5, y: 9.5}, //position initiale
	bomb: true,
	alive: true,
	color: "#99ff99",
}
// var allBots = [];
// allBots.push(bot1);
// allBots.push(bot2);
// allBots.push(bot3);


//Dessine un cercle pour le joueur
//pour être au milieu de la case il faut 0.5
function drawPlayer(x, y, color) {
	context.beginPath();
	context.arc(x, y, 0.3, 0, 2 * Math.PI, false);
	context.fillStyle = color;
	context.fill();
}


function draw() {
	//on doit clear avant
	context.fillStyle = "#693647";
	context.fillRect(0, 0, canvas.width, canvas.height);
	
	//puis on dessine les obstacle et le joueur
	drawObstacles(obstacleMatrix);
	drawPlayer(player.position.x, player.position.y, player.color);
	if (bot1.alive)
		drawPlayer(bot1.position.x, bot1.position.y, bot1.color);
	if (bot2.alive)
		drawPlayer(bot2.position.x, bot2.position.y, bot2.color);
	if (bot3.alive)
		drawPlayer(bot3.position.x, bot3.position.y, bot3.color);
}


//pour bouger
function moveUp(player, matrix) {
	if ((player.position.y-1 > 0) && (((matrix[player.position.y-1.5][player.position.x-0.5]) == 0) || ((matrix[player.position.y-1.5][player.position.x-0.5]) == 3))) // je sais pas pk il m'oblige a mettre 3 parenthèses ici.. sinon il y a un bug c bizarre
		player.position.y--;
	else {
		// console.log(matrix[player.position.y-1.5][player.position.x-0.5]);
		// console.log("x = " + player.position.x + "y = " + player.position.y);
	}
}
function moveDown(player, matrix) {
	if ((player.position.y+1 < matrix.length) && (((matrix[player.position.y+0.5][player.position.x-0.5]) == 0) || ((matrix[player.position.y+0.5][player.position.x-0.5]) == 3)))
		player.position.y++;
	else
		console.log("x = " + player.position.x + " y= " + player.position.y);
}
function moveLeft(player, matrix) {
	if ((player.position.x-1 > 0) && ((matrix[player.position.y-0.5][player.position.x-1.5]) == 0) || ((matrix[player.position.y-0.5][player.position.x-1.5]) == 3))
		player.position.x--;
	else
		console.log("x = " + player.position.x + "y = " + player.position.y);
}
function moveRight(player, matrix) {
	if ((player.position.x+1 < matrix.length) && ((matrix[player.position.y-0.5][player.position.x+0.5]) == 0) || ((matrix[player.position.y-0.5][player.position.x+0.5]) == 3))
		player.position.x++;
	else
		console.log("x = " + player.position.x + " y= " + player.position.y);
}

function bombUp(player, matrix) {
	if ((player.position.y-1 > 0) && ((matrix[player.position.y-1.5][player.position.x-0.5]) == 0))
		matrix[player.position.y-1.5][player.position.x-0.5] = 3;
}
function bombDown(player, matrix) {
	if ((player.position.y+1 < matrix.length) && ((matrix[player.position.y+0.5][player.position.x-0.5]) == 0))
		matrix[player.position.y+0.5][player.position.x-0.5] = 3;
}
function bombLeft(player, matrix) {
	if ((player.position.x-1 > 0) && ((matrix[player.position.y-0.5][player.position.x-1.5]) == 0))
		matrix[player.position.y-0.5][player.position.x-1.5] = 3;
}
function bombRight(player, matrix) {
	if ((player.position.x+1 > 0) && ((matrix[player.position.y-0.5][player.position.x+0.5]) == 0))
		matrix[player.position.y-0.5][player.position.x+0.5] = 3;
	else
		console.log("x = " + player.position.x + 0.5 + " y= " + player.position.y - 0.5);
}


//pour gérer les touches
// up, down, left, right pour bouger
// space puis up, down, left, right pour placer la bombe

/* up : 38
   down : 40
   right : 39
   left : 37
   space : 32
	*/

window.addEventListener("keydown", keysPressed, false);

up = false;
down = false;
left = false;
right = false;
spaceup = false;
spacedown = false;
spaceleft = false;
spaceright = false;

var keys = [];
function keysPressed(e) { //j'aurai préférer utiliser les fonction directement ici mais j'ai pa réussi a mettre à la fonction d'autres arguments
    /* store an entry for every key pressed */
    keys[e.keyCode] = true;
    
    /* space + up */
    if (keys[32]) {
		if (keys[38]) {
			spaceup = true;
			// alert("space + up");
			keys[32] = false; //if faut pas oublier de remettre les valeur a false
			keys[38] = false;
		}
		else if (keys[40]) {
			spacedown = true;
			// alert("space + down");
			keys[32] = false;
			keys[40] = false;
		}
		else if (keys[39]) {
			spaceright = true;
			// alert("space + right");
			keys[32] = false;
			keys[39] = false;
		}
		else if (keys[37]) {
			spaceleft = true;
			// alert("space + left");
			keys[32] = false;
			keys[37] = false;
		}
    }
	else if (keys[38]) {
		up = true;
		// alert("up");
		keys[38] = false;
	}
	else if (keys[40]) {
		down = true;
		// alert("down");
		keys[40] = false;
	}
	else if (keys[39]) {
		right = true;
		// alert("right");
		keys[39] = false;
	}
	else if (keys[37]) {
		left = true;
		// alert("left");
		keys[37] = false;
	}
}


//fonction générale
//selon les boolean on utilise la fonction, et on remet le boolean à false 
function managePlayer(player, matrix) {
	if (spaceup) {
		bombUp(player, matrix);
		spaceup = false;
	}
	else if (spacedown) {
		bombDown(player, matrix);
		spacedown = false;
	}
	else if (spaceleft) {
		bombLeft(player, matrix);
		spaceleft = false;
	}
	else if (spaceright) {
		bombRight(player, matrix);
		spaceright = false;
	}
	else if (up) {
		moveUp(player, matrix);
		up = false;
	}
	else if (down) {
		moveDown(player, matrix);
		down = false;
	}
	else if (left) {
		moveLeft(player, matrix);
		left = false;
	}
	else if (right) {
		moveRight(player, matrix);
		right = false;
	}
}


//pour pouvoir trouver le delta du temps
var lastTime = 0;
//toute les x sec on explose toutes les bombes posé (la bombe peut être posé récemment mais si elle est posé à la fin de l'intervalle choisit elle expolose quand même)
//alors il faut resreindre le mouvement selon l'intervalle aussi
//pour être plus régulier il faut que se soit un multiple de 16.6 = deltaTime
//a changer, pas 100% beau, mouvements bizarre s
var explosionInterval = 1.67 * 2000; // on explose tous les 1.8sec, à changer si c'est trop rapide
var explosionCounter = 0; // pour comter le temps passé
var movingInterval = explosionInterval/(1.67 * 5);
var movingCounter = 0;

//retourne un array avec les indexes des points équivalents a la valeur
function searchAround(matrix, y, x, value){
	var res = [];
	var testArray = [
		[-1, -1], [-1, 0], [-1, 1],
		[0, -1], [0, 1],
		[1, -1], [1, 0], [1, 1],
	];
	
	var tmpX;
	var tmpY;
	for (i=0; i<testArray.length; i++){
		tmpX = x + testArray[i][1]
		tmpY = y + testArray[i][0]
		
		if (tmpX>=0 && tmpX<matrix.length && tmpY>=0 && tmpY<matrix.length) {
			if (matrix[tmpY][tmpX] == value)
				res.push([tmpY, tmpX]);
		}
	}
	
	return res;
}

//vérifie si le joueur est proche de la bombe
function checkIndexPlayer(matrix, x, y, player){
	var testArray = [
		[-1, -1], [-1, 0], [-1, 1],
		[0, -1], [0, 1],
		[1, -1], [1, 0], [1, 1],
	];
	
	var tmpX;
	var tmpY;
	for (i=0; i<testArray.length; i++){
		/* console.log("OG = " + x + " " + y); */
		tmpX = x + testArray[i][1]
		tmpY = y + testArray[i][0]
		
		if (tmpX>=0 && tmpX<matrix.length && tmpY>=0 && tmpY<matrix.length) {
			console.log(tmpX + " " + tmpY);
			console.log("------1--" + player.position.y + " " + player.position.x);
			if ((player.position.y - 0.5 == tmpY) && (player.position.x - 0.5 == tmpX)){
				player.alive = false;
				/* console.log("------2--" + player.position.y + " " + player.position.x); */
				/* console.log("test3"); */
			}
		}
	}
}

//explose les obstacles destructibles et les joueurs autour de la bombe
function explosion(matrix, player) {
	matrix.forEach((row, y) => {
		row.forEach((value, x) => {
			if (value == 3) {
				/* console.log("OG1 = " + x + " " + y); */
				//on supprime la bombe, on pourra mettre un effet ici
				matrix[y][x] = 0;
				
				//pour les joueurs
				checkIndexPlayer(obstacleMatrix, x, y, player);
				checkIndexPlayer(obstacleMatrix, x, y, bot1);
				checkIndexPlayer(obstacleMatrix, x, y, bot2);
				checkIndexPlayer(obstacleMatrix, x, y, bot3);
				
				//pour les obstacles
				var destructibleObstacles = searchAround(matrix, y, x, 2);
				if(destructibleObstacles.length != 0) {
					for (i=0; i<destructibleObstacles.length; i++) {
						y = destructibleObstacles[i][0];
						x = destructibleObstacles[i][1];
						
						matrix[y][x] = 0;
					}
				}
			}
		});
	});
}


function update(time = 0) {
	if (player.alive) {
		const deltaTime = time - lastTime;
		lastTime = time;
		// console.log(deltaTime);
		
		////////////// pour prévenir les joueurs du temps d'explosion
		//evite de se tuer
		if (explosionCounter<(explosionInterval*0.25) && explosionCounter>=0)
			document.getElementById("explosionCounter").innerHTML = "Explosion in: 3";
		else if (explosionCounter<(explosionInterval*0.5) && explosionCounter>=(explosionInterval*0.25))
			document.getElementById("explosionCounter").innerHTML = "Explosion in: 2";
		else if (explosionCounter<(explosionInterval*0.75) && explosionCounter>=(explosionInterval*0.5))
			document.getElementById("explosionCounter").innerHTML = "Explosion in: 1";
		else if (explosionCounter<explosionInterval && explosionCounter>=(explosionInterval*0.75))
			document.getElementById("explosionCounter").innerHTML = "<span style='background-color: #ff3333; color: white; border-radius: 10px; padding-right: 4px; padding-left: 4px;'>Explosion in: 0</span>";
		//////////////
		
		explosionCounter += deltaTime; // compteur du temps passé
		if (explosionCounter > explosionInterval) {
			explosion(obstacleMatrix, player);
			explosionCounter = 0;
		}
		
		draw();
		
		movingCounter += deltaTime;
		if (movingCounter > movingInterval) {
			managePlayer(player, obstacleMatrix);
			movingCounter = 0;
		}
		
		requestAnimationFrame(update);
		
		if (!bot1.alive && !bot2.alive && !bot3.alive) {
			context.fillStyle = "#693647";
			context.fillRect(0, 0, canvas.width, canvas.height);
		
			document.getElementById("canvasDiv").innerHTML = "<h2>Well Played !</h2>";
		}
	}
	else {
		context.fillStyle = "#693647";
		context.fillRect(0, 0, canvas.width, canvas.height);
		
		document.getElementById("canvasDiv").innerHTML = "<h2>Game Over..</h2>";
	}
}
 

update();
 


// /*//pour trouver le keycode
// document.addEventListener('keydown', event => {
	// console.log(event);
// });*/





//////////////////////////// USELESS *not*
// Titre par défaut
// if (player.alive) { //marche pas ici mais en bas ça marche, après avoir affiché "Game Over" si on appuit surles touches, la phrase réapparait
var titlebase = function()
{
	return document.querySelector("#canvasDiv > p").innerHTML;
}();

// anime le texte en fonction des touches appuyées
document.addEventListener('keydown', event => {
	
	// Titre
	// <id=canvasDiv><p>Titre</p></>
	var ele = document.querySelector("#canvasDiv > p");
	var txt = ele.innerHTML;
	var c = 0;

	switch(event.keyCode)
	{
		/* up : 38
	   down : 40
	   right : 39
	   left : 37 
	   space : 32
		*/

		case 38: c = '↑'; break;
		case 40: c = '↓'; break;
		case 39: c = '→'; break;
		case 37: c = '←'; break;
		default:
		break;
	}

	if((c != 0) && player.alive)
	{
		var parts = titlebase.split(c);
		ele.innerHTML = parts[0] + "<span style='background-color: pink;'>" + c + "</span>" + parts[1];
	}
});
// }