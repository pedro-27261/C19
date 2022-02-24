var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-outline-png.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  spookySound.loop ();
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  climbersGroup = new Group ();
  doorsGroup = new Group ();
  invisibleBlockGroup = new Group ();

  ghost = createSprite(200,200,50,50);
  ghost.addImage("ghost", ghostImg);
  ghost.scale = 0.1
  }

function draw() {
  background(0);
  if (gameState === "play") {
  
  if (keyDown ("left_arrow")) {
    ghost.x = ghost.x -3;
  }
  if (keyDown ("right_arrow")) {
    ghost.x = ghost.x + 3  
  }
  if (keyDown ("space")) {
    ghost.velocityY =  -10
    
  }
  ghost.velocityY =  ghost.velocityY + 0.8
}

  if(tower.y > 400){
      tower.y = 300
    }
  
  spawnDoors ();
  if (climbersGroup.isTouching (ghost)) {
    ghost.velocityY = 0;

  } 
  if (invisibleBlockGroup.isTouching (ghost) || ghost.y > 600) {
  ghost.destroy ();
  gameState = "end"
  }
 
  
   drawSprites (); 
   
   if (gameState === "end") {
    stroke ("white");
    fill ("white");
    textSize (30);
    text ("Fim de Jogo",230,250);
  }





}

function spawnDoors () {
  if (frameCount %240 === 0) {
    var door = createSprite (200,-5);
    var climber = createSprite (200,10);
    var invisibleBlock = createSprite (200,15);
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;
    door.x = Math.round (random(120,400));
    climber.x = door.x;
    invisibleBlock.x = door.x;
    door.addImage ("door", doorImg);
    climber.addImage ("climber", climberImg);
    door.velocityY = 1;
    climber.velocityY = 1;
    invisibleBlock.velocityY = 1;
    ghost.depth = door.depth;
    ghost.depth += 1;

    door.lifetime = 800;
    invisibleBlock.lifetime = 800;
    climber.lifetime = 800;
    doorsGroup.add (door);
    invisibleBlockGroup.add (invisibleBlock);
    climbersGroup.add (climber); 

  }
}