//on load le canvas
const canvas = document.getElementById('bomber');
const context = canvas.getContext('2d');


//donner la couleur et afficher
context.fillStyle = "#693647";
context.fillRect(0, 0, canvas.width, canvas.height);


//les obstacles en forme de tableau 
/* 0 --> vide
   1 --> obstacle non destructible
   2 --> obstacle destructibe
   3 --> bomb
  */
const obstacleMatrix = [
	[0, 0, 2, 0, 0, 0, 1, 0, 0, 0],
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
//le canvas est carré donc il faut un tavleau carré aussi
tailleObstacle = canvas.width/obstacleMatrix.length;
context.scale(tailleObstacle, tailleObstacle)


//dessine les obstacles
function drawObstacles(matrix) {
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


//le joueur avec une position et des bombs (j'ai pas encore géré)
var player = {
	position: {x: 9.5, y: 0.5}, //position initiale
	bomb: true,
}


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
	drawPlayer(player.position.x, player.position.y, 'pink');
}


//keys : up, down, right, left
function movePlayer(player, matrix) {
	/* up : 38
	   down : 40
	   right : 39
	   left : 37 
	   space : 32
	*/
	// console.log("--------------" + matrix[2][0])
	document.addEventListener('keydown', event => {
		// console.log("--------------" + matrix[2][0])
		if (event.keyCode == 38) {
			if ((player.position.y-1 > 0) && ((matrix[player.position.y-1.5][player.position.x-0.5]) == 0) || ((matrix[player.position.y-1.5][player.position.x-0.5]) == 3))
				player.position.y--;
			console.log(matrix[player.position.y-1.5][player.position.x-0.5]);
			//console.log("x = " + player.position.x + "y = " + player.position.y)
		}
		
		else if (event.keyCode == 40) {
			if ((player.position.y+1 < matrix.length) && ((matrix[player.position.y+0.5][player.position.x-0.5]) == 0) || ((matrix[player.position.y-1.5][player.position.x-0.5]) == 3))
				player.position.y++;
			//console.log("x = " + player.position.x + " y= " + player.position.y)
		}
		
		else if (event.keyCode == 39) {
			if ((player.position.x+1 < matrix.length) && ((matrix[player.position.y-0.5][player.position.x+0.5]) == 0) || ((matrix[player.position.y-1.5][player.position.x-0.5]) == 3))
				player.position.x++;
			// console.log("x = " + player.position.x + " y= " + player.position.y)
		}
		
		else if (event.keyCode == 37) {
			if ((player.position.x-1 > 0) && ((matrix[player.position.y-0.5][player.position.x-1.5]) == 0) || ((matrix[player.position.y-1.5][player.position.x-0.5]) == 3))
				player.position.x--;
			// console.log("x = " + player.position.x + "y = " + player.position.y)
		}
	});
}

putBomb = false;
// /!\ faut la modifier, marche pas 
function managingBombs(player, matrix) {
	document.addEventListener('keydown', event => {
		if (event.keyCode == 32) {
			putBomb = !putBomb;
			if (putBomb == true) {
				document.addEventListener('keydown', event => {
					if (event.keyCode == 38){
						if (matrix[player.position.y-1.5][player.position.x-0.5] == 0)
							matrix[player.position.y-1.5][player.position.x-0.5] = 3;
					}
					
					else if (event.keyCode == 40) {
						if (matrix[player.position.y+0.5][player.position.x-0.5] == 0)
							matrix[player.position.y+0.5][player.position.x-0.5] = 3;
					}
					
					else if (event.keyCode == 39) {
						if (matrix[player.position.y-0.5][player.position.x+0.5] == 0)
							matrix[player.position.y-0.5][player.position.x+0.5] = 3;
					}
					
					else if (event.keyCode == 37) {
						if (matrix[player.position.y-0.5][player.position.x-1.5] == 0)
							matrix[player.position.y-0.5][player.position.x-1.5] = 3;
					}
				});
			}
		}
	});
}


// /!\ il faut pas mettre movePlayer dans update
// si on met espace il faut pas move

// /!\ faut la modifier, marche pas

managingBombs(player, obstacleMatrix);
movePlayer(player, obstacleMatrix);
function update() {
	draw();
	requestAnimationFrame(update);
}


update();


/*//pour trouver le keycode
document.addEventListener('keydown', event => {
	console.log(event);
});*/