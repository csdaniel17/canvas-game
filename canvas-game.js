var score = 0;
var highScore = 0;

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

//add game board
var backgroundImage = new Image();
backgroundImage.src = 'images/background.png';

//add hero to board
var heroImage = new Image();
heroImage.src = 'images/hero.png';
var hero = {
  x: 200,
  y: 200,
  dirX: 0,
  dirY: 0,
  speed: 2
};
/*
var heroDirX = 0;
var heroDirY = 0;
var heroSpeed = 5;
*/

//add monster to board
var monsterImage = new Image();
monsterImage.src = 'images/monster.png';
var monster = {
  x: 300,
  y: 300,
  dirX: 1,
  dirY: 0,
  speed: 1
};
/*
var monsterDirX = 1;
var monsterDirY = 0;
var monsterSpeed = 1;
*/

//add 2 goblins to board
var goblinImg1 = new Image();
goblinImg1.src = 'images/goblin.png';
var goblin1 = {
  x: 150,
  y: 150,
  dirX: 1,
  dirY: 0,
  speed: 1
};
/*
var goblin1DirX = 1;
var goblin1DirY = 0;
var goblin1Speed = 1;
*/
var goblinImg2 = new Image();
goblinImg2.src = 'images/goblin.png';
var goblin2 = {
  x: 250,
  y: 250,
  dirX: 1,
  dirY: 0,
  speed: 1
};
/*
var goblin2DirX = 1;
var goblin2DirY = 0;
var goblin2Speed = 1;
*/

//move hero around board
window.addEventListener('keydown', function(event) {
  var key = event.keyCode;
  if (key === 37) { //left
    hero.dirX = -1;
  } else if (key === 39) { //right
    hero.dirX = 1;
  } else if (key === 38) { //up
    hero.dirY = -1;
  } else if (key === 40) {
    hero.dirY = 1;
  }
  handleWrapping(hero);
});
window.addEventListener('keyup', function(event) {
  var key = event.keyCode;
  if (key === 37) { //left
    hero.dirX = 0;
  } else if (key === 39) { //right
    hero.dirX = 0;
  } else if (key === 38) { //up
    hero.dirY = 0;
  } else if (key === 40) {
    hero.dirY = 0;
  }
});

//players wrap around board
function handleWrapping(object) {
  if (object.x > 512) {
    object.x = 0;
  }
  if (object.x < 0) {
    object.x = 512;
  }
  if (object.y > 480) {
    object.y = 0;
  }
  if (object.y < 0) {
    object.y = 480;
  }
}

//detect collision
//hero & monster
function monsterCollision() {
  if (hero.x + 32 < monster.x) {
    return false;
  } else if (monster.x + 32 < hero.x) {
    return false;
  } else if (hero.y + 32 < monster.y) {
    return false;
  } else if (monster.y + 32 < hero.y) {
    return false;
  }
  return true;
}

//hero & goblin1
function goblin1Collision() {
  if (hero.x + 32 < goblin1.x) {
    return false;
  } else if (goblin1.x + 32 < hero.x) {
    return false;
  } else if (hero.y + 32 < goblin1.y) {
    return false;
  } else if (goblin1.y + 32 < hero.y) {
    return false;
  }
  return true;
}

//hero & goblin2
function goblin2Collision() {
  if (hero.x + 32 < goblin2.x) {
    return false;
  } else if (goblin2.x + 32 < hero.x) {
    return false;
  } else if (hero.y + 32 < goblin2.y) {
    return false;
  } else if (goblin2.y + 32 < hero.y) {
    return false;
  }
  return true;
}

var counter = 0;
function main () {
  counter++;
  ctx.drawImage(backgroundImage, 0, 0);
  ctx.drawImage(heroImage, hero.x, hero.y);

  //hero position
  hero.x += hero.dirX * hero.speed;
  hero.y += hero.dirY * hero.speed;

  //change monster direction
  if (counter % 50 === 0) {
    monster.dirX = Math.floor(Math.random() * 3) -1;
    monster.dirY = Math.floor(Math.random() * 3) -1;
  }
  //update monster position
  monster.x += monster.dirX * monster.speed;
  monster.y += monster.dirY * monster.speed;
  handleWrapping(monster);

  if (monsterCollision()) {
    score++;
    if (score > highScore) {
      highScore = score;
    }
    monster.x = Math.random() * 512;
    monster.y = Math.random() * 480;
  }

  if (goblin1Collision()) {
    score = 0;
    document.getElementById('message').innerHTML = "shoot - a goblin gotcha";
    hero.x = 200;
    hero.y = 200;
    goblin1.x = Math.random() * 512;
    goblin1.y = Math.random() * 480;
  }

  if (goblin2Collision()) {
    score = 0;
    document.getElementById('message').innerHTML = "shoot - a goblin gotcha";
    hero.x = 200;
    hero.y = 200;
    goblin2.x = Math.random() * 512;
    goblin2.y = Math.random() * 480;
  }

  //change goblin1 direction
  if (counter % 50 === 0) {
    goblin1.dirX = Math.floor(Math.random() * 3) -1;
    goblin1.dirY = Math.floor(Math.random() * 3) -1;
  }
  //update goblin1 position
  goblin1.x += goblin1.dirX * goblin1.speed;
  goblin1.y += goblin1.dirY * goblin1.speed;
  handleWrapping(goblin1);

  //change goblin2 direction
  if (counter % 50 === 0) {
    goblin2.dirX = Math.floor(Math.random() * 3) -1;
    goblin2.dirY = Math.floor(Math.random() * 3) -1;
  }
  //update goblin1 position
  goblin2.x += goblin2.dirX * goblin2.speed;
  goblin2.y += goblin2.dirY * goblin2.speed;
  handleWrapping(goblin2);

  ctx.drawImage(monsterImage, monster.x, monster.y);
  ctx.drawImage(goblinImg1, goblin1.x, goblin1.y);
  ctx.drawImage(goblinImg2, goblin2.x, goblin2.y);

  //add score
  ctx.font = "16px sans-serif";
  ctx.fillStyle = "white"
  ctx.fillText('Score: ' + score, 35, 47)
  ctx.fillText('High Score: ' + highScore, 35, 65)

  requestAnimationFrame(main);
}
main();
