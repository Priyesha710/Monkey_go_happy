var monkey, monkey_running, monkey_still;
var banana, bananaImage, obstacle, obstacleImage;
var ground;
var FoodGroup, obstacleGroup;
var foodReserve = 7;
var back_ground, back_groundImage;
var survivalTime = 0, high = 0 ,
  gameState;
var PLAY = 1,
  END = 0;
gameState = PLAY;
var flag = 0;
function preload() {


  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")
 monkey_still = loadAnimation("sprite_0.png");
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  back_groundImage = loadImage("background.png");
}



function setup() {
  createCanvas(400, 400);
  back_ground = createSprite(200, 200, 10, 10);
  back_ground.addImage(back_groundImage);
  monkey = createSprite(100, 350, 10, 10);
  monkey.addAnimation("running", monkey_running);
  monkey.addAnimation("still",monkey_still);
  monkey.scale = 0.15;
  ground = createSprite(400, 395, 900, 10);
  ground.visible = false;
  obstacleGroup = createGroup();
  foodGroup = createGroup();
  //monkey.debug = true;
}


function draw() {
  background("white");
  monkey.collide(ground);

 
  if (gameState === PLAY) {
    spawn_obstacles_and_food();
 monkey.changeAnimation("running",monkey_running)
     ground.velocityX = -5;
survivalTime=Math.ceil(frameCount/frameRate());
                          if(ground.x===0){
    ground.x = 400;
  }
    if(monkey.velocityY !== 0||monkey.y<250){
       monkey.changeAnimation("still",monkey_still);
    }
    if (keyDown("space")&&monkey.y>250) {//making monkey jump when space is pressed
      monkey.velocityY = -12;
    }    
    if(frameCount%200  === 0){
      foodReserve = foodReserve - 1;
      
    }
  
    monkey.velocityY = monkey.velocityY + 0.5;//gravity
    if (monkey.isTouching(obstacleGroup)||foodReserve === 0) {
      gameState = END;
    }
  
    if(monkey.isTouching(foodGroup)){
      banana.destroy();
      foodReserve = foodReserve+1;
    }
  } else if (gameState === END) {
  
    obstacleGroup.setVelocityXEach(0);
    foodGroup.destroyEach();
  ground.velocityX = 0;
    monkey.velocityY = 0;
    if(survivalTime>high){
      high = survivalTime; 
    }
     monkey.changeAnimation("still",monkey_still);
    if(keyDown("space")){
      gameState = PLAY;
      survivalTime = 0;
      frameCount = 0;
      obstacleGroup.destroyEach();
      flag = 1;     
      foodReserve = 5;
      monkey.changeAnimation("running",monkey_running);
    }
  }
  drawSprites();
    fill("white");
  text("SURVIVAL TIME: "+survivalTime,10,30);
  if(flag===1){
    
    text("Highest survival: "+high,150,30);
  }
  if(gameState === PLAY){
    text("Food left: "+ foodReserve,260,30);
    text("Press space to jump.",10,50)
  }
 if(gameState === END){
   text("Press space to play again.",140,200);
 }
}

function spawn_obstacles_and_food() {
  if (frameCount % 250 === 0) {
    obstacle = createSprite(10, 390, 40, 40);
    obstacle.x = Math.round(random(400, 450));
    obstacle.velocityX = ground.velocityX;
   obstacle.addImage(obstacleImage);
    obstacle.scale = 0.2;
    obstacle.setCollider("rectangle",0,0,400,400);
    obstacle.collide(ground);
    obstacleGroup.add(obstacle);
    obstacle.lifeTime = 40;
    //obstacle.debug = true;
    banana = createSprite(10, 20, 10, 10);
    banana.x = obstacle.x;
    banana.velocityX = obstacle.velocityX;
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.y = Math.round(random(50,250));
    foodGroup.add(banana);
    banana.lifeTime = 40;
  }
}



      

