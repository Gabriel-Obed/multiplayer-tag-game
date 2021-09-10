var canvas, backgroundImage;

var gameState = 0;
var playerCount;
var allPlayers;
var distance = 0;
var database;

var form, player, game;

var cars, car1, car2, car3, car4, plr1Img, plr2Img, car3Img, car4Img, ground, track;
var obstacle1, obstacle2, obstacle3, obstacle4, boxImg1, boundary1, boundary2, boundary3, boundary4;

function preload(){
  plr1Img = loadImage("character1.png");
  plr2Img = loadImage("character.png");
  boxImg1 = loadImage("wood1.png");

}

function setup(){
  canvas = createCanvas(displayWidth - 20, displayHeight-30);
  database = firebase.database();
  
  game = new Game();
  game.getState();
  game.start();
  obstacle1 = createSprite(-500, 278, 81, 81);
  obstacle1.addImage(boxImg1);
  obstacle2 = createSprite(347, 291, 81, 81);
  obstacle2.addImage(boxImg1);
  obstacle3 = createSprite(347, 1091, 81, 81);
  obstacle3.addImage(boxImg1);
  obstacle4 = createSprite(-500, 1091, 81, 81);
  obstacle4.addImage(boxImg1);
  boundary1 = createSprite(displayWidth/2-800, displayHeight+400, displayWidth, 20);
  boundary1.shapeColor = "Yellow";
  boundary2 = createSprite(displayWidth/2-800, displayHeight-900, displayWidth, 20);
  boundary2.shapeColor = "Yellow";
  boundary3 = createSprite(boundary2.x-boundary2.width/2-10, 1300/2-20, 20, boundary1.y-boundary2.y*2);
  boundary3.shapeColor = "Yellow";
  boundary4 = createSprite(boundary2.x+boundary2.width/2+!0, 1300/2-20, 20, boundary1.y-boundary2.y*2);
  boundary4.shapeColor = "Yellow";

}


function draw(){
  if(playerCount === 2){
    game.update(1);
  }
  if(gameState === 1){
    clear();
    game.play();
  }
  if (gameState === 2) {
    game.end();
  }
  console.log(mouseX);
  console.log(mouseY)
}
