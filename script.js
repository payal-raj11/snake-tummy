let gameRunning = false;
let stopped=false;
let gameInterval;

const board=document.querySelector(".board");

const cellsize=20;
let score=0;
const scoreElement=document.querySelector("#score");
let snakeElements=[];
let snake=[{x:5,y:1},
    
    {x:5,y:2},
{x:5,y:3}
,{x:5,y:4}];
let direction = "UP";
let nextDirection = "UP";



snake.forEach(function(part){
    let segment=document.createElement("div");

    segment.style.width=cellsize+"px";
    segment.style.height=cellsize+"px";
    segment.style.backgroundColor="green";
    segment.style.position='absolute';
    segment.style.borderRadius= "8px";
    segment.style.border="2px solid #0c4f0f";
    segment.style.left=part.x*cellsize+"px";
    segment.style.top=part.y*cellsize+"px";
    board.appendChild(segment);
    snakeElements.push(segment);
});
//moving the snake 
function movesnake(){
    direction = nextDirection;
    let preTail={
        x:snake[snake.length-1].x,
        y:snake[snake.length-1].y
    }
    for(let i=snake.length-1;i>0;i--){
        snake[i].x=snake[i-1].x;
        snake[i].y=snake[i-1].y;

    }
     
    
    
if (direction === "UP") {
    snake[0].y--;
}
else if (direction === "DOWN") {
    snake[0].y++;
}
else if (direction === "LEFT") {
    snake[0].x--;
}
else if (direction === "RIGHT") {
    snake[0].x++;
}


//boundary condition
let columns = Math.floor(board.clientWidth / cellsize);
let rows = Math.floor(board.clientHeight / cellsize);
if (snake[0].x < 0) {
    snake[0].x=columns-1;
}
    if (snake[0].y < 0) {
    snake[0].y=rows-1;
}
if (snake[0].x >=columns) {
    snake[0].x = 0;
}
    if (snake[0].y >=rows) {
    snake[0].y = 0;
}
//self collision
if(snake.slice(1).some(part=>
        part.x===snake[0].x && part.y===snake[0].y
    )){
        clearInterval(gameInterval);
    endGame();
    return;
    }

    for(let i=0;i<snake.length;i++){
        snakeElements[i].style.left=snake[i].x * cellsize +"px";
        snakeElements[i].style.top = snake[i].y * cellsize + "px";
    }

//checking the collision

if (snake[0].x===food.x && snake[0].y===food.y){
    snake.push(preTail);

    let segment=document.createElement("div")
    segment.style.width=cellsize+"px";
    segment.style.height=cellsize+"px";
    segment.style.backgroundColor="green";
    segment.style.position="absolute";
    segment.style.borderRadius="8px";
    segment.style.border="2px solid #0c4f0f";
    segment.style.left = preTail.x * cellsize + "px";
segment.style.top = preTail.y * cellsize + "px";

    board.appendChild(segment);
    snakeElements.push(segment);

    score++;
    scoreElement.textContent="Current Score=" +String(score).padStart(4,"0");
let columns = Math.floor(board.clientWidth / cellsize);
let rows = Math.floor(board.clientHeight / cellsize);
if (snake.length >= columns * rows) {
    endGame();
    return;
}
    food=randomFood();
    foodElement.style.left = food.x * cellsize + "px";
    foodElement.style.top = food.y * cellsize + "px";
}
};

// movement control

document.addEventListener("keydown", function(event) {
    if (event.key === "ArrowUp" && direction !== "DOWN") {
        nextDirection = "UP";
    }
    else if (event.key === "ArrowDown" && direction !== "UP") {
        nextDirection = "DOWN";
    }
    else if (event.key === "ArrowLeft" && direction !== "RIGHT") {
        nextDirection = "LEFT";
    }
    else if (event.key === "ArrowRight" && direction !== "LEFT") {
        nextDirection = "RIGHT";
    }
});


//creating the food

function randomFood(){
    let columns=Math.floor(board.clientWidth/cellsize);
    let rows=Math.floor(board.clientHeight/cellsize);
    let newFood;
    do{
        newFood={
            x:Math.floor(Math.random()*columns),
            y:Math.floor(Math.random()*rows)
        };
    }while(snake.some(part=>
        part.x===newFood.x && part.y===newFood.y)

    );


    return newFood;
};

let food=randomFood();

let foodElement=document.createElement("div");
foodElement.style.width=cellsize+"px";
foodElement.style.height=cellsize+"px";
foodElement.style.backgroundColor="red";
foodElement.style.borderRadius="50%";
foodElement.style.border= "2px solid #cf0606";
foodElement.style.position = "absolute";
foodElement.style.left = food.x * cellsize + "px";
foodElement.style.top = food.y * cellsize + "px";
foodElement.classList.add("food-blink");
board.appendChild(foodElement);


function endGame() {
    gameRunning = false;
    stopped=true;
    clearInterval(gameInterval);

    document.querySelector("#finalScore").textContent =
        "Your Score: " + score;

    document.querySelector("#gameOver").style.display = "block";
    document.querySelector("#switch").textContent = "Start Again!";
}
function stopGame() {
    gameRunning = false;
    stopped=true;
    clearInterval(gameInterval);
    document.querySelector("#switch").textContent = "Resume!";
}
function resumeGame() {
    gameRunning = true;
    stopped=false;
    gameInterval = setInterval(movesnake, 170);
    document.querySelector("#switch").textContent = "Stop";
}
function startGame() {
    clearInterval(gameInterval);

    // Remove the old snake
    snakeElements.forEach(function(segment) {
        segment.remove();
    });

    snakeElements = [];

    // Remove the old food
    foodElement.remove();

    // Reset the snake
    snake = [
        {x: 5, y: 1},
        {x: 5, y: 2},
        {x: 5, y: 3},
        {x: 5, y: 4}
    ];

    direction = "UP";
nextDirection = "UP";
    score = 0;

    scoreElement.textContent = "Current Score=0000";

    // Hide the Game Over screen
    document.querySelector("#gameOver").style.display = "none";

    // Reset the button text
    document.querySelector("#switch").textContent = "Start!";

    // Recreate the snake elements
    snake.forEach(function(part) {
        let segment = document.createElement("div");

        segment.style.width = cellsize + "px";
        segment.style.height = cellsize + "px";
        segment.style.backgroundColor = "green";
        segment.style.position = "absolute";
        segment.style.borderRadius = "8px";
        segment.style.border = "2px solid #0c4f0f";
        segment.style.left = part.x * cellsize + "px";
        segment.style.top = part.y * cellsize + "px";

        board.appendChild(segment);
        snakeElements.push(segment);
    });


    // Create new food
    food = randomFood();

    foodElement = document.createElement("div");
    foodElement.style.width = cellsize + "px";
    foodElement.style.height = cellsize + "px";
    foodElement.style.backgroundColor = "red";
    foodElement.style.borderRadius = "50%";
    foodElement.style.border = "2px solid #cf0606";
    foodElement.style.position = "absolute";
    foodElement.classList.add("food-blink");

    foodElement.style.left = food.x * cellsize + "px";
    foodElement.style.top = food.y * cellsize + "px";

    board.appendChild(foodElement);

    // Start moving the snake again
   gameRunning = true;
   stopped=false;
gameInterval = setInterval(movesnake, 170);
document.querySelector("#switch").textContent = "Stop";
}
document.querySelector("#switch").addEventListener("click", function() {
    const gameOverVisible =
        document.querySelector("#gameOver").style.display === "block";

    if (gameOverVisible) {
        startGame();
    }
    else if (gameRunning ){
        stopGame();
    }
    else {
        resumeGame();
    }
});