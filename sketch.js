var PLAY=1;
var END=0;
var gameState=PLAY

var airplane,airplaneImg;
var cloud,cloudImg,cloudG;
var person,person1Img,person2Img,personG;
var bird1,bird2,bird1Img,bird2Img,birdG;
var score;
var iur,ilr;
var reset,resetImg,gameOver,gameOverImg;

function preload(){
airplaneImg=loadImage("Airplane.png")
cloudImg=loadImage("cloud.png")
person1Img=loadImage("person1.png")
  person2Img=loadImage("person2.png")
  bird1Img=loadImage("Bird1.png")
  bird2Img=loadImage("bird2.png")
  resetImg=loadImage("resetCloud.png")
  gameOverImg=loadImage("GameOver.png")
}

function setup() {
 createCanvas(400,400);
  
  
  reset=createSprite(200,220);
  reset.addImage(resetImg);
  reset.scale=0.5;
  //reset.debug=true;
  
  gameOver=createSprite(200,150);
  gameOver.addImage(gameOverImg);
  gameOver.scale=0.1;
  
  airplane=createSprite(70,height/2);
  airplane.addImage(airplaneImg);
  airplane.scale=0.18;
  //airplane.debug=true
  
  personG=new Group();
  cloudG=new Group();
  birdG=new Group();
  
  score=0;
  
  iur=createSprite(width/2,5,400,10);
  ilr=createSprite(width/2,395,400,10);
  iur.visible=false;
  ilr.visible=false;
  
}

function draw() {
 background("skyBlue");
  
  fill("darkBlue");
  text("Passenger Count: "+score,width-125,30);
  
  
  
  if(gameState===PLAY){
    gameOver.visible=false;
    reset.visible=false;
  
  if(airplane.isTouching(personG)){
    personG.destroyEach();
    score=score+1
  }
  
    if(airplane.isTouching(birdG)){
      gameState=END;
    }
  
    if(keyIsDown(RIGHT_ARROW)){
      airplane.x+=10;
    }
    if(keyIsDown(LEFT_ARROW)){
      airplane.x-=10;
    }
    if(keyIsDown(UP_ARROW)){
      airplane.y-=10;
    }
    if(keyIsDown(DOWN_ARROW)){
      airplane.y+=10;
    }
    camera.position.x=airplane.x;
    camera.position.y=height/2;
  
  spawnClouds();
  spawnPeople();
  spawnBirds();
  }
  
  else if(gameState===END){
    
    gameOver.visible=true;
    reset.visible=true;
    
    cloudG.setLifetimeEach(-1);
    personG.setLifetimeEach(-1);
    birdG.setLifetimeEach(-1);
    
    airplane.visible=false;
    cloudG.destroyEach();
    personG.destroyEach();
    birdG.destroyEach();
    
    if(mousePressedOver(reset)){
      restart();
    }
  }
  
  drawSprites();
}

function spawnClouds(){
  if(frameCount%100===0){
  cloud=createSprite(0,100);
  //cloud.x+=100;
  cloud.y=Math.round(random(50,150))
  cloud.addImage(cloudImg);
  cloud.scale=0.15;
  cloud.velocityX=(5+score/3);
  cloud.lifetime=1000;
  cloudG.add(cloud);
  console.log(frameCount);
    
  airplane.depth=cloud.depth;
  airplane.depth=airplane.depth+1;
  }
}

function spawnPeople(){
  if(frameCount%200===0){
    person=createSprite(0,300);
    person.y=Math.round(random(100,300))
    //person.x+=30;
    person.velocityX=(5+score/3);
    //person.debug=true;
    
    
    var rand=Math.round(random(1,2));
    switch(rand){
      case 1:person.addImage(person1Img);
        person.scale=0.15;
        person.setCollider("rectangle",0,0,200,500);
        break;
        case 2:person.addImage(person2Img);
        person.scale=0.015;
        break;
        default: break;
    }
    personG.add(person);
    person.lifetime=400;
  }
}

function spawnBirds(){
  if(frameCount%100===0){
  bird=createSprite(0,100);
  bird.y=Math.round(random(100,300));
  //bird.x+=30;
  bird.velocityX=(5+score/3);
  //bird.debug=true
    var rand=Math.round(random(1,2));
    switch(rand){
      case 1:bird.addImage(bird1Img);
        bird.scale=0.025;
        break;
        case 2:bird.addImage(bird2Img);
        bird.scale=0.13;
        break;
        default: break;
    }
    birdG.add(bird);
  }
}

function restart(){
  gameState=PLAY;
  score=0;
  cloudG.destroyEach();
  personG.destroyEach();
  birdG.destroyEach();
  airplane.visible=true;
}

