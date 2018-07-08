//on load le canvas
const canvas = document.getElementById('bomber');
const context = canvas.getContext('2d');

//donner la couleur et afficher
context.fillStyle = "#693647";
context.fillRect(0, 0, canvas.width, canvas.height);

//les obstacles en forme de tableau 
// 1 --> non destructibles, 2 --> destructible
const obstacleMatrix = [
	[0, 0, 1, 0, 0],
	[0, 2, 1, 1, 2],
	[2, 0, 0, 1, 0],
	[1, 0, 0, 2, 0],
	[1, 1, 0, 1, 1],
];

//pour pouvoir afficher à la bonne taille
tailleObstacle = canvas.width/obstacleMatrix.length;
context.scale(tailleObstacle, tailleObstacle)

function drawObstacles(matrix) {
	matrix.forEach((row, y) => {
		row.forEach((value, x) => {
			if (value != 0) {
				if (value == 1)
					context.fillStyle = 'lightblue';
				else
					context.fillStyle = '#568cb3';
				context.fillRect(x, y, 1, 1);
			}
		});
	});
}

var player = {
	position: {x: 0.5, y: 0.5}, //position initiale
	bomb: 0,
}

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
	
	//puis
	drawObstacles(obstacleMatrix);
	drawPlayer(player.position.x, player.position.y, 'pink');
}

function movePlayer(player, matrix) {
	/* up : 38
	   down : 40
	   right : 39
	   left : 37 
	*/
	// console.log("--------------" + matrix[2][0])
	document.addEventListener('keydown', event => {
		// console.log("--------------" + matrix[2][0])
		if (event.keyCode == 38) {
			if ((player.position.y-1 > 0) && ((matrix[player.position.y-1.5][player.position.x-0.5]) != 1))
				player.position.y--;
			console.log(matrix[player.position.y-1.5][player.position.x-0.5]);
			//console.log("x = " + player.position.x + "y = " + player.position.y)
		}
		
		else if (event.keyCode == 40) {
			if ((player.position.y+1 < matrix.length) && ((matrix[player.position.y+0.5][player.position.x-0.5]) != 1))
				player.position.y++;
			//console.log("x = " + player.position.x + " y= " + player.position.y)
		}
		
		else if (event.keyCode == 39) {
			if ((player.position.x+1 < matrix.length) && ((matrix[player.position.y-0.5][player.position.x+0.5]) != 1))
				player.position.x++;
			// console.log("x = " + player.position.x + " y= " + player.position.y)
		}
		
		else if (event.keyCode == 37) {
			if ((player.position.x-1 > 0) && ((matrix[player.position.y-0.5][player.position.x-1.5]) != 1))
				player.position.x--;
			// console.log("x = " + player.position.x + "y = " + player.position.y)
		}
	});
}

// il faut pas mettre movePlayer dans update
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