// constants of game
let inputDir={x: 0, y: 0};
const foodsound=new Audio('music_food.mp3');
const gameoversound=new Audio('music_gameover.mp3');
const movesound=new Audio('music_move.mp3');
const musicsound=new Audio('Owlcity.mp3');
// const musicsound=new Audio('music_music.mp3');
let speed=10;
let score = 0;
let lastpainttime=0;
let snakearr=[
    {x:13,y:15}
]
food={x:5,y:4};

//game function
function main(ctime){
    window.requestAnimationFrame(main);
    // console.log(ctime);
    if((ctime- lastpainttime)/1000 < 1/speed){
        return;
    }
    lastpainttime=ctime;
    GameEngine();
}
function iscollide(snake){
    //if you hit your body
    for (let i = 1; i < snakearr.length; i++) {
        if  (snake[i].x===snake[0].x && snake[i].y===snake[0].y){
            return true;
        }
    }
    //if you bump into the wall
        if(snake[0].x>=18 || snake[0].x<=0 || snake[0].y>=18 || snake[0].y<=0){
            return true;
        }
}

function GameEngine(){
// updating the snake array 
if(iscollide(snakearr)){
    gameoversound.play();
    musicsound.pause();
    inputDir={x:0,y:0};
    alert("Game Over, Press (any) key to play again");
    snakearr=[{x:13,y:15}];
    musicsound.play();
    score = 0;
}

//if you have eaten the food update the score and regenerate the food
if(snakearr[0].y===food.y && snakearr[0].x===food.x){
    foodsound.play();
    score+=1;
    score1.innerHTML="score: "+score;
    snakearr.unshift({x: snakearr[0].x+inputDir.x,y: snakearr[0].y+inputDir.y});
    let a= 2;
    let b= 16;
    food={x:Math.round(a+(b-a)*Math.random()),y:Math.round(a+(b-a)*Math.random())}
}

//moving the snake
for (let i = snakearr.length-2; i>=0; i--) {
    snakearr[i+1]={...snakearr[i]};
    
}
snakearr[0].x+=inputDir.x;
snakearr[0].y+=inputDir.y;

// rendering the snake and food
board.innerHTML="";
snakearr.forEach((e,index)=>{
    snakeElement= document.createElement('div');
    snakeElement.style.gridRowStart = e.y;
    snakeElement.style.gridColumnStart = e.x;
    if(index===0){
        snakeElement.classList.add('head');
    }
    else{
        snakeElement.classList.add('snake');
    }
    board.appendChild(snakeElement);
});
    foodElement= document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}

//main function
window.requestAnimationFrame(main);
window.addEventListener('keydown',e=>{
    inputDir={x:0,y:1}//game start
    movesound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x= 0;
            inputDir.y= -1;
            break;

        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x= 0;
            inputDir.y= 1;
            break;

        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x= 1;
            inputDir.y= 0;
            break;

        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x= -1;
            inputDir.y= 0;
            break;
    
        default:
            break;
    }
});