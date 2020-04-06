let canvas = document.getElementById("snake"); // relacionando com o html
let context = canvas.getContext("2d"); // dimensão
let box = 32; // quantidade de pixel cada quadrado
let snake = []; //definindo o array
snake[0] ={
	x: 8 *box,
	y: 8 *box
}
let direction = "right";
let food = {
	x: Math.floor(Math.random() * 15 + 1) * box, // Math.floor - retira parte flutuante
	y: Math.floor(Math.random() * 15 + 1) * box  // Math.random gera um número aleatório
}

function criarBG(){
	context.fillStyle = "#708090"; // cor de onde acontece o jogo
	context.fillRect(0, 0, 16 * box, 16 * box); // tamanho (x, y, altura, largura)
}

function criarCobrinha(){
	for(i=0; i < snake.length; i++){
		context.fillStyle="#FF1493"; // define a cor da cobrinha
		context.fillRect(snake[i].x, snake[i].y, box, box); // posição da cobrinha
	}
}

function drawFood(){ 
	context.fillStyle = "#B0E0E6"; // cor da comida
	context.fillRect(food.x, food.y, box, box); // posição da comida
}

document.addEventListener('keydown', update); // "keydown" evento de clique do teclado

function update(event){ // direção que a cobrinha vai andar
	if(event.keyCode == 37 && direction != "right") direction = "left";
	if(event.keyCode == 38 && direction != "down") direction = "up";
	if(event.keyCode == 39 && direction != "left") direction = "right";
	if(event.keyCode == 40 && direction != "up") direction = "down";
}

function iniciaJogo(){
	// limitação das bordas
	if(snake[0].x > 15 * box && direction == "right") snake[0].x = 0; // (snake[0] é a cabela, x é o corpo) 
	if(snake[0].x < 0 && direction == "left") snake[0].x = 16 * box;
	if(snake[0].y > 15 * box && direction == "down") snake[0].y = 0;
	if(snake[0].y < 0 && direction == "up") snake[0].y = 16 * box;

	// fim do jogo
	for(i=1; i < snake.length; i++){
		if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
			clearInterval(jogo);
			alert("Game Over =(");
		}
	}

	// chama as funções
	criarBG();
	criarCobrinha();
	drawFood();
	
	let snakeX = snake[0].x;
	let snakeY = snake[0].y;

	// lógica da movimentação 
	if(direction == "right") snakeX += box;
	if(direction == "left") snakeX -= box;
	if(direction == "up") snakeY -= box;
	if(direction == "down") snakeY += box;
	
	if(snakeX != food.x || snakeY != food.y){
		snake.pop(); // exclui sempre o último 
	}
	// cria a frutinha aleatoriamente
	else{food.x = Math.floor(Math.random() * 15 + 1) * box, 
		 food.y = Math.floor(Math.random() * 15 + 1) * box 
	}
	
	//cabeça da cobrinha
	let newHead = { 
		x: snakeX,
		y: snakeY
	}
	
	snake.unshift(newHead); // acrescenta um no primeiro elemento - faz a cobrinha crescer
}

let jogo = setInterval(iniciaJogo, 100); //atualiza a tela a cada 100 milisegundos
