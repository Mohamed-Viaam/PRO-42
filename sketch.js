var backImg, issImg;
var cdImg, forwardImg, leftImg, rightImg;
var iss;
var crewDragon;
var successSound, rcsSound, backMusic, failedSound;
var distanceX, distanceY;
var dockIss, dockDragon
var screeenImg, panelImg;
var hud;
var dragonX, dragonY;
var hasDocked = false;
var hasPlayed = false;
var failedPlayed = false;

function preload(){
  backImg = loadImage("Images/spacebg.jpg");
  issImg = loadImage("Images/iss.png");
  cdImg = loadAnimation("Images/crewDragon.png");
  forwardImg = loadAnimation("Images/crewFwd.png");
  rightImg = loadAnimation("Images/crewLft.png");
  leftImg = loadAnimation("Images/crewRgt.png");
  successSound = loadSound("Sounds/dockingSuccessful.mp3");
  rcsSound = createAudio("Sounds/rcsfiring.wav");
  screeenImg = loadImage("Images/screen.jpg");
  backMusic = loadSound("Sounds/backgroundMusic.mp3");
  failedSound = loadSound("Sounds/failed.mp3");
}

function setup() {
  createCanvas(1300, 650);
  backMusic.loop()
  iss = createSprite(300, 325, 20, 20);
  iss.addImage(issImg);
  iss.scale = 1.2

  dragonX = Math.round(random(600, 860));
  dragonY = Math.round(random(90, 550));
  crewDragon = createSprite(dragonX, dragonY, 20, 20);
  crewDragon.addAnimation("static", cdImg);
  crewDragon.addAnimation("forward", forwardImg)
  crewDragon.addAnimation("right", rightImg)
  crewDragon.addAnimation("left", leftImg)
  crewDragon.scale = 0.1

  dockIss = createSprite(520, 319, 10, 10)
  dockIss.visible = false;
  dockDragon = createSprite(dragonX - 35, dragonY, 10, 10)
  dockDragon.visible = false;

  hud = createSprite(1100, 130, 10, 10);
  hud.addImage(screeenImg);
  hud.scale = 1.1
}

function draw() {
  background(backImg);  
  
  if(!hasDocked && distanceX > -1){
    if(keyDown('UP_ARROW')){
      crewDragon.velocityY = -1;
      dockDragon.velocityY = -1;
      rcsSound.volume(0.2);
      rcsSound.play();
      crewDragon.changeAnimation("right", rightImg);
    }
    else if(keyDown('DOWN_ARROW')){
      crewDragon.velocityY = +1
      dockDragon.velocityY = +1;
      rcsSound.volume(0.2);
      rcsSound.play();
      crewDragon.changeAnimation("left", leftImg);
    }
    else if(keyDown('LEFT_ARROW')){
      crewDragon.velocityX = -1;
      dockDragon.velocityX = -1;
      rcsSound.volume(0.2);
      rcsSound.play();
      crewDragon.changeAnimation("forward", forwardImg);
    }
    else {
      crewDragon.velocityX = 0;
      crewDragon.velocityY = 0;
      dockDragon.velocityX = 0;
      dockDragon.velocityY = 0;
      rcsSound.stop();
      crewDragon.changeAnimation("static", cdImg);
    }
  }

  if(distanceX === 0 && distanceY === 0 && hasPlayed === false){
    successSound.play();
    rcsSound.stop();
    backMusic.stop();
    hasPlayed = true;
    hasDocked = true;
    crewDragon.velocityX = 0;
    crewDragon.velocityY = 0;
    dockDragon.velocityX = 0;
    dockDragon.velocityY = 0;
    crewDragon.changeAnimation("static", cdImg);
  }

  if(distanceX < -1 && failedPlayed === false){
    failedSound.play();
    failedPlayed = true;
    rcsSound.stop();
    backMusic.stop();
    crewDragon.velocityX = 0;
    crewDragon.velocityY = 0;
    dockDragon.velocityX = 0;
    dockDragon.velocityY = 0;
    crewDragon.changeAnimation("static", cdImg);
  }

  distanceX =  dockDragon.x - (dockIss.x + dockIss.width);
  distanceY =  dockDragon.y - dockIss.y;

  drawSprites();
  
  fill("white");
  textSize(14);
  text("X: " + distanceX, 950, 60);
  text("Y: " + distanceY, 950, 80);
  if(hasDocked === true){
    text("Resilliance SpaceX - docking sequence is complete!" , 930, 150);
    text("Welcome to the ISS Resilliance", 930, 170);
  }
  if(distanceX < -1){
    text("MISSION FAILED", 930, 150);
  }
  //text("X"+mouseX+","+"Y"+mouseY,mouseX,mouseY);
}

