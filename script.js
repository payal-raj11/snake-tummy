let gameRunning = false;
let stopped=false;
let gameInterval;
const board=document.querySelector(".board");
const foodeating=new Audio("sounds/foodEating.mp3");
const bonuseating=new Audio("sounds/bonusEating.mp3")
const gamestart=new Audio("sounds/gamestart.mp3");
const gameend=new Audio("sounds/gameend.mp3")
const bgm=new Audio("sounds/Bgm.mp3")
bgm.loop=true;
bgm.volume=0.25;
foodeating.preload="auto";
bonuseating.preload="auto";
foodeating.load();
bonuseating.load();

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
let highestScore = Number(
    localStorage.getItem("snakeTummyHighScore")
) || 0;
document.querySelector("#h_sc").textContent =
        "highest Score: " + String(highestScore).padStart(4,"0");

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
    playSound(foodeating);
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
//bonus collison
if (
    bonusFood &&
    snake[0].x >= bonusFood.x &&
    snake[0].x <= bonusFood.x + 1 &&
    snake[0].y >= bonusFood.y &&
    snake[0].y <= bonusFood.y + 1
) {
    let bonusPoints;

    if (bonusRemaining >= 14) {
        bonusPoints = 5;
    }
    else if (bonusRemaining >= 10) {
        bonusPoints = 4;
    }
    else if (bonusRemaining >= 5) {
        bonusPoints = 3;
    }
    else {
        bonusPoints = 2;
    }

    score += bonusPoints;
   playSound(bonuseating);
    scoreElement.textContent =
        "Current Score=" + String(score).padStart(4, "0");

    growSnake(bonusPoints);
    removeBonusFood();
    bonusSpawnElapsed = 0;
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
    
    bgm.pause();
bgm.currentTime = 0;
    clearInterval(gameInterval);
    playSound(gameend);
    document.querySelector("#finalScore").textContent =
        "Your Score: " + score;

    document.querySelector("#gameOver").style.display = "block";
    document.querySelector("#switch").textContent = "Start Again!";
    if (score>highestScore){
         highestScore = score;
        localStorage.setItem("snakeTummyHighScore", highestScore);
    }
    document.querySelector("#h_sc").textContent =
        "highest Score: " + String(highestScore).padStart(4,"0");  
removeBonusFood();
    }
function stopGame() {
    gameRunning = false;
    bgm.pause();
    clearInterval(gameInterval);
    document.querySelector("#switch").textContent = "Resume!";
}
function resumeGame() {
    gameRunning = true;
    bgm.play().catch(error => {
        console.log("Background music could not play:", error);
    });
    gameInterval = setInterval(movesnake, 170);
    document.querySelector("#switch").textContent = "Stop";
}
function startGame() {
    playSound(gamestart);
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
        removeBonusFood();
    bonusSpawnElapsed = 0;
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
    if (bgm.paused) {
    bgm.play().catch(error => {
        console.log("Background music could not play:", error);
    });
}
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

//BONUS EFFECT
let bonusFood = null;
let bonusElement = null;

let bonusSpawnElapsed = 0;
let bonusRemaining = 0;
//in seconds
const bonusSpawnTime = 15; 
const bonusDuration = 15;   

let bonusTimerInterval;
const bonusTimerElement = document.querySelector("#bonusTimer");

function createBonusFood() {
    let columns = Math.floor(board.clientWidth / cellsize);
    let rows = Math.floor(board.clientHeight / cellsize);
    let newFood;

    do {
        newFood = {
            x: Math.floor(Math.random() * (columns - 1)),
            y: Math.floor(Math.random() * (rows - 1))
        };
    } while (
        snake.some(part =>
            (part.x === newFood.x || part.x === newFood.x + 1) &&
            (part.y === newFood.y || part.y === newFood.y + 1)
        ) ||
        (food.x >= newFood.x && food.x <= newFood.x + 1 &&
         food.y >= newFood.y && food.y <= newFood.y + 1)
    );

    bonusFood = newFood;

    bonusElement = document.createElement("div");
    bonusElement.style.width = (cellsize * 2) + "px";
    bonusElement.style.height = (cellsize * 2) + "px";
    bonusElement.style.position = "absolute";
    bonusElement.style.left = bonusFood.x * cellsize + "px";
    bonusElement.style.top = bonusFood.y * cellsize + "px";
    bonusElement.style.backgroundColor = "gold";
    bonusElement.style.border = "2px solid orange";
    bonusElement.style.borderRadius = "50%";
    bonusElement.style.zIndex = "2";
    bonusElement.classList.add("food-blink");

    board.appendChild(bonusElement);

    bonusRemaining = bonusDuration;
bonusTimerElement.style.display = "block";
bonusTimerFill.style.width = "100%";
}

function removeBonusFood() {
    if (bonusElement) {
        bonusElement.remove();
    }

    bonusFood = null;
    bonusElement = null;
    bonusRemaining = 0;
    bonusTimerElement.style.display = "none";
bonusTimerFill.style.width = "0%";
}

function updateBonusFood() {
    if (!gameRunning) return;

    if (bonusFood) {
        bonusRemaining--;

bonusTimerFill.style.width =
    (bonusRemaining / bonusDuration * 100) + "%";

        if (bonusRemaining <= 0) {
            removeBonusFood();
            bonusSpawnElapsed = 0;
        }
    } else {
        bonusSpawnElapsed++;

        if (bonusSpawnElapsed >= bonusSpawnTime) {
            bonusSpawnElapsed = 0;
            createBonusFood();
        }
    }
}

bonusTimerInterval = setInterval(updateBonusFood, 1000);

function growSnake(amount) {
    let tail = snake[snake.length - 1];

    for (let i = 0; i < amount; i++) {
        snake.push({ x: tail.x, y: tail.y });

        let segment = document.createElement("div");
        segment.style.width = cellsize + "px";
        segment.style.height = cellsize + "px";
        segment.style.backgroundColor = "green";
        segment.style.position = "absolute";
        segment.style.borderRadius = "8px";
        segment.style.border = "2px solid #0c4f0f";
        segment.style.left = tail.x * cellsize + "px";
        segment.style.top = tail.y * cellsize + "px";

        board.appendChild(segment);
        snakeElements.push(segment);
    }
}

//playing the sound
function playSound(sound) {
  sound.currentTime = 0;
  sound.play().catch(error => {
    console.log("Sound playback failed:", error);
  });
}