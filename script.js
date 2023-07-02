/* VARIABLES */
let screen = 0;
let playButton;
let garden, path;
let player, walls;
let wall1, wall2, wall3, wall4, wall5, wall6, wall7, wall8, wall9, wall10, wall11;
let seedGame, sunGame;
let seedScore = 0;
let seedCatcher, fallingSeed, fallingBug;
let cloud1, cloud2, cloud3, cloud4, cloud5;
let bugImg, sunImg, cloudImg;
let cloudCount = 0;
let cloudBackground;

function preload() {
  bugImg = loadImg('assets/bugfinal.png');
  sunImg = loadImg('assets/sunfinally.png');
  cloudImg = loadImg('assets/stormycloudmain-removebg-preview.png');
  cloudBackground = loadImg('assets/finalskybg.png');
}

/* SETUP RUNS ONCE */
function setup() {
  createCanvas(400, 400);


  //Set up the homescreen
  background('darkseagreen');
  fill(17, 71, 6);
  textAlign(CENTER);
  textSize(40);
  text("Evergreen", width / 2, height / 2 - 50);
  textSize(15);
  text("a gardening game", width / 2, height / 2 - 25);
  
  playButton = new Sprite(width / 2, (height / 2) + 40);
  garden = new Sprite(-200, -200);
  path = new Sprite(-200, -200);
  seedGame = new Sprite(-200, -200);
  sunGame = new Sprite( -200, -200);
  seedCatcher = new Sprite(-200, -200);
  fallingSeed = new Sprite(-200, -200);
 
}

/* DRAW LOOP REPEATS */
function draw() {
  homescreen();
  
//Going to garden once play is pressed
  if(playButton.mouse.presses()) {
    screen = 1;
    gardenScreen();
  }
  
//Going to path after seeing garden
  if(screen == 1){
    if(path.mouse.presses()) {
     pathScreen();
     screen = 2;
    }
  }
  
//Checking which game player presses
  if(seedGame.mouse.presses()){
      screen = 3;
      seedGameSetup();
    }
  else if(sunGame.mouse.presses()) {
      screen = 8;
      sunGameSetup();
    }
  
//Playing seed game
  if(screen == 3) {
  background(235, 235, 220);
  cloudBackground.resize(400, 0);
  image(cloudBackground, 0, 0);

  // Draw directions to screen
  fill(128, 44, 38);
  textSize(12);
  text("Move the watering can to catch\nrain drops, but make sure\nyou don't grab any bugs!\nCollect 20 droplets to win.", width - 100, 20);
  //Draw score to the screen
  fill(128, 44, 38);
  textSize(25);
  text("score:  " + seedScore, 60, 40);
    
  //If fallingObject reaches bottom, move back to random position at top
  if(fallingSeed.y >= height) {
      fallingSeed.y = 0;
      fallingSeed.x = random(width);
      fallingSeed.vel.y = random(3, 5);
  }
  
  //If fallingBug reaches bottom, move back to random position at top
  if(fallingBug.y >= height) {
      fallingBug.y = 0;
      fallingBug.x = random(width);
      fallingBug.vel.y = random(3, 5);
  }

  
  //Move catcher
  if(kb.pressing('left')) {
    seedCatcher.vel.x = -5;
  }
  else if(kb.pressing('right')) {
    seedCatcher.vel.x = 5;
  }
  else {
    seedCatcher.vel.x = 0;
  }
  
  //Stop catcher at edges of screen
  if(seedCatcher.x < 40) {
    seedCatcher.x = 40;
  }
  else if(seedCatcher.x > 360) {
    seedCatcher.x = 360;

  }

  if(fallingBug.x < 40) {
    fallingBug.x = 40;
  }
  else if(fallingBug.x > 360) {
    fallingBug.x = 360;
  }

  if(fallingSeed.x < 40) {
    fallingSeed.x = 40;
  }
  else if(fallingSeed.x > 360) {
    fallingSeed.x = 360;
  }
  
  //If fallingObject collides with catcher, move back to random position    at top
  if(fallingSeed.collides(seedCatcher)) {
    seedScore = seedScore + 1;
    fallingSeed.y = 0;
    fallingSeed.x = random(width);
    fallingSeed.vel.y = random(3, 6);
    fallingSeed.direction = 'down';
  }

  //If fallingObject collides with catcher, move back to random position    at top
  if(fallingBug.collides(seedCatcher)) {
    seedScore = seedScore - 1;
    fallingBug.y = 0;
    fallingBug.x = random(width);
    fallingBug.vel.y = random(3, 6);
    fallingBug.direction = 'down';
  }
  

  //If bug collides with water drop, both keep falling down
    if(fallingBug.collides(fallingSeed)) {
      fallingBug.direction = 'down';
      fallingSeed.direction = 'down';
    }

 //You lose statement
  if(seedScore < 0) {
    youLose();
    if(mouseIsPressed) {
      restartSeedGame();
    }
  } 
  
//You win statement
  if(seedScore == 20) {
    plantedSeeds();
    screen = 4;
  }  
    
}
  
  //Going back to path after winning seed
if(screen == 4) {
  if(mouse.pressing()) {
    screen = 2;
    pathScreen();
  }
}
  
//Playing sun game
  if(screen == 8) {
  background('lightskyblue');

    
  fill(0);
  textSize(10) 
  text('Pass through all of\n the storm clouds and\ncomplete the\nmaze to reveal\nthe sun.', 340, height/2 -20);
    
    //Move the player
  if (kb.pressing("left")) {
    player.vel.x = -3;
  } else if (kb.pressing("right")) {
    player.vel.x = 3;
  } else if (kb.pressing("up")) {
    player.vel.y = -3;
  } else if (kb.pressing("down")) {
    player.vel.y = 3;
  } else {
    player.vel.x = 0;
    player.vel.y = 0;
  }
  //Player cannot go above maze
  if (player.y < 20) {
    player.y = 20;
  }


  //Player wins
    if(player.y > 380 && cloudCount != 4) {
      player.y = 380;
    }
    else if (player.y > 380 && cloudCount == 4) {
    screen = 9;
   }
//clouds disappear when sun touches them
  if(player.collides(cloud1)) {
    cloud1.x = -200;
    cloud1.y = -200;
    cloudCount++;
  }
  else if (player.collides(cloud2)) {
    cloud2.x = -200;
    cloud2.y = -200;
    cloudCount++;

  }
  else if(player.collides(cloud3)) {
    cloud3.x = -200;
    cloud3.y = -200;
    cloudCount++;

  }
  else if(player.collides(cloud4)) {
    cloud4.x = -200;
    cloud4.y = -200;
    cloudCount++;
  }
    


    
}

//Finished garden screen
  if(screen == 9) {
    finishedGarden();
    screen = 10;
  }
  
//Restarting game
  if(screen == 10){
    if(mouse.pressing()) {
    garden.pos = {x: -200, y: -200};
    restartGame();
    homescreen();
  }
}

  
}

function homescreen() {
    // Display play button
  playButton.w = 150;
  playButton.h = 60;
  playButton.collider = 'k';
  playButton.color = 'seagreen';
  playButton.text = 'play';
  playButton.textSize = 25;
  playButton.textColor = 'white';

}
function gardenScreen() {
  playButton.pos = {x: -200, y: - 200};

  //Create background
  background('seagreen');
  fill(255);
  textSize(15);
  text('Welcome to your garden!\nClick on the path to start growing.' , width /2, height / 2 - 125); 

  //Garden setup
  garden.pos = {x: width / 2 - 100, y: height / 2 + 25};
  garden.img = 'assets/seedsgarden.png';
  garden.w = 125;
  garden.h = 125;
  garden.collider = 's';
  garden.rotation = 0;

  //Path setup
  path.pos = {x: width / 2 + 150, y: height / 2 + 25};
  path.w = 200;
  path.h = 125;
  path.rotation = 0;
  path.collider = 's'
  path.color = 'tan';
  strokeWeight(10);
  path.stroke = 'gray';

  

}
function pathScreen() {
  //Create background
  background('seagreen');
  fill(255);

  garden.pos = {x: -200, y: - 200};

  strokeWeight(10);
  path.pos = {x: 200, y: height/2 + 25};
  path.w = 600;
  noStroke();

    textSize(15);
    text('Go through each level to watch your garden flourish!\n Start off by watering your seeds.' , width /2, height / 2 - 100);

  seedGame.pos = {x: 125, y: height / 2 + 25};
  seedGame.img = 'assets/finalwateringcan.png';
  seedGame.w = 50;
  seedGame.h = 40;
  seedGame.collider = 's';
  seedGame.rotation = 0;
  seedGame.color = 'white';

  sunGame.pos = {x: 310, y: height / 2 + 25};
  sunGame.img = sunImg;
  
  sunGame.w = 50;
  sunGame.h = 40;
  sunGame.collider = 's';
  sunGame.rotation = 0;
  sunGame.color = 'white';

}
function seedGameSetup() {
  background(235, 235, 220);
  path.pos = {x: -200, y: -200};
  seedGame.pos = {x: -200, y: -200};
  sunGame.pos = {x: -200, y: -200};

  seedCatcher.pos = {x: 200, y: 355};
  seedCatcher.img = 'assets/finalwateringcan.png';
  seedCatcher.w = 60;
  seedCatcher.h = 60;
  seedCatcher.collider = 'k';
  seedCatcher.color = color(95,158,160);
  seedCatcher.rotation = 0;

  //Create falling object
  fallingSeed = new Sprite(150, 0, 40);
  fallingSeed.img = 'assets/raindrop.png';
  fallingSeed.rotationLock = true;
  fallingSeed.color = color(0,128,128);
  fallingSeed.vel.y = 3;
  fallingSeed.direction = 'down';
  
  fallingBug = new Sprite(bugImg, 150, 0, 40)
  fallingBug.rotationLock = true;
  fallingBug.color = color(0,128,128);
  fallingBug.vel.y = 3;
  fallingBug.direction = 'down';
}
function sunGameSetup() {
  //Move sprites off screen
  path.pos = {x: -200, y: -200};
  seedGame.pos = {x: -200, y: -200};
  sunGame.pos = {x: -200, y: -200};

  //create player sprite
  sunImg.resize(215, 0);
  player = new Sprite(sunImg, 355, 30, 50, 'd');
  player.rotationLock = true;

  //create clouds
  cloud1 = new Sprite(cloudImg, 250, 100, 50, 's');
  cloud2 = new Sprite(cloudImg, 100, 150, 50, 's');
  cloud3 = new Sprite(cloudImg, 300, 300, 50, 's');
  cloud4 = new Sprite(cloudImg, 125, 325, 50, 's');

  mazeSetup();

  

}
function mazeSetup() {
  //Create the maze
  walls = new Group();
  walls.color = 'darkslateblue';
  wall1 = new walls.Sprite(155, 10, 300, 10);
  wall2 = new walls.Sprite(10, height/2, 10, height - 15);  
  wall3 = new walls.Sprite(150, 60, 10, 100);
  wall4 = new walls.Sprite(width/2 + 35, 390, 325, 10);
  wall5 = new walls.Sprite(50, 300, 75, 10); 
  wall6 = new walls.Sprite(340, 146, 110, 10);
  wall7 = new walls.Sprite(340, 250, 110, 10);
  wall8 = new walls.Sprite(285, 198, 10, 109);
  wall9 = new walls.Sprite(185, 332, 10, 109);
  wall10 = new walls.Sprite(190, 197, 185, 10);
  wall11 = new walls.Sprite(395, 200, 10, 380);
  walls.collider = 's';
}
function finishedGarden() {
    player.pos = {x: -200, y: -200};
    wall1.pos = {x: -200, y: -200};
    wall2.pos = {x: -200, y: -200};
    wall3.pos = {x: -200, y: -200};
    wall4.pos = {x: -200, y: -200};
    wall5.pos = {x: -200, y: -200};
    wall6.pos = {x: -200, y: -200};
    wall7.pos = {x: -200, y: -200};
    wall8.pos = {x: -200, y: -200};
    wall9.pos = {x: -200, y: -200};
    wall10.pos = {x: -200, y: -200};
    wall11.pos = {x: -200, y: -200};
  
  background('seagreen');
  fill(255);
  //make the garden Image be one with seeds!!
  garden.pos = {x: width/2, y: height/2 + 50}; 
  garden.img = 'assets/finishedgardenfinal.png';
  textSize(15) 
  text('Congratulations!\n Your garden has finished growing.\nClick to restart the game.', width/2, height/2 - 125);
} 
function restartSeedGame() {
  
  seedScore = 0;

  seedCatcher.pos = { x: 200, y: 380 };
  fallingSeed.y = 0;
  fallingSeed.x = random(width);
  fallingSeed.velocity.y = random(1,5);
  fallingSeed.direction = "down";

  fallingBug.y = 0;
  fallingBug.x = random(width);
  fallingBug.velocity.y = random(1,5);
  fallingBug.direction = "down";
  
}
function plantedSeeds() {
  seedCatcher.pos = { x: 600, y: -300 };
  fallingSeed.pos = { x: -100, y: 0 };
  fallingBug.pos = { x: -100, y: 0 };
  
  background('seagreen');
  fill(255);
  //make the garden Image be one with seeds!!
  garden.pos = {x: width/2 , y: height/2 + 25}; 
  garden.img = 'assets/sproutsgarden.png'
  textSize(15) 
  text('Your seeds are starting to sprout!\n Click to go back and\ngive your garden sunlight.', width/2, height/2 - 125);
}
function restartGame() {
  //Set up the homescreen
  background("darkseagreen");
  fill(17, 71, 6);
  textAlign(CENTER);
  textSize(40);
  text("Evergreen", width / 2, height / 2 - 50);
  textSize(15);
  text("a gardening game", width / 2, height / 2 - 25);
  
  homescreen();

  playButton.pos = {x: width / 2, y: (height / 2) + 40};
}
function youLose() {
  background('seagreen');
    
  seedCatcher.pos = { x: 600, y: -300 };
  fallingSeed.pos = { x: -100, y: 0 };
  fallingBug.pos = { x: -100, y: 0 };
    
  textSize(25);
  fill(255);
  text('Try again!', width / 2, height / 2 - 30);
  textSize(20);
  text('Click to restart', width / 2 , height / 2);
}

