var score = 0;

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
  y: 200
};
var heroDirX = 0;
var heroDirY = 0;
var heroSpeed = 1;

//add monster to board
var monsterImage = new Image();
monsterImage.src = 'images/monster.png';
var monster = {
  x: 300,
  y: 300
};

var monsterDirX = 1;
var monsterDirY = 0;
var monsterSpeed = 1;

//add 2 goblins to board
var goblinImg1 = new Image();
goblinImg1.src = 'images/goblin.png';
var goblin1 = {
  x: 150,
  y: 150
};
var goblin1DirX = 1;
var goblin1DirY = 0;
var goblin1Speed = 1;

var goblinImg2 = new Image();
goblinImg2.src = 'images/goblin.png';
var goblin2 = {
  x: 250,
  y: 250
};
var goblin2DirX = 1;
var goblin2DirY = 0;
var goblin2Speed = 1;

//move hero around board
window.addEventListener('keydown', function(event) {
  var key = event.keyCode;
  if (key === 37) { //left
    heroDirX = -1;
  } else if (key === 39) { //right
    heroDirX = 1;
  } else if (key === 38) { //up
    heroDirY = -1;
  } else if (key === 40) {
    heroDirY = 1;
  }
  handleWrapping(hero);
});
window.addEventListener('keyup', function(event) {
  var key = event.keyCode;
  if (key === 37) { //left
    heroDirX = 0;
  } else if (key === 39) { //right
    heroDirX = 0;
  } else if (key === 38) { //up
    heroDirY = 0;
  } else if (key === 40) {
    heroDirY = 0;
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
function collision() {
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

var counter = 0;
function main () {
  counter++;
  ctx.drawImage(backgroundImage, 0, 0);
  ctx.drawImage(heroImage, hero.x, hero.y);

  //hero position
  hero.x += heroDirX * heroSpeed;
  hero.y += heroDirY * heroSpeed;

  //change monster direction
  if (counter % 50 === 0) {
    monsterDirX = Math.floor(Math.random() * 3) -1;
    monsterDirY = Math.floor(Math.random() * 3) -1;
  }
  //update monster position
  monster.x += monsterDirX * monsterSpeed;
  monster.y += monsterDirY * monsterSpeed;
  handleWrapping(monster);

  if (collision()) {
    score++;
    monster.x = Math.random() * 512;
    monster.y = Math.random() * 480;
  }

  //change goblin1 direction
  if (counter % 50 === 0) {
    goblin1DirX = Math.floor(Math.random() * 3) -1;
    goblin1DirY = Math.floor(Math.random() * 3) -1;
  }
  //update goblin1 position
  goblin1.x += goblin1DirX * goblin1Speed;
  goblin1.y += goblin1DirY * goblin1Speed;
  handleWrapping(goblin1);

  //change goblin2 direction
  if (counter % 50 === 0) {
    goblin2DirX = Math.floor(Math.random() * 3) -1;
    goblin2DirY = Math.floor(Math.random() * 3) -1;
  }
  //update goblin1 position
  goblin2.x += goblin2DirX * goblin2Speed;
  goblin2.y += goblin2DirY * goblin2Speed;
  handleWrapping(goblin2);

  ctx.drawImage(monsterImage, monster.x, monster.y);
  ctx.drawImage(goblinImg1, goblin1.x, goblin1.y);
  ctx.drawImage(goblinImg2, goblin2.x, goblin2.y);

  //add score
  ctx.font = "32px sans-serif";
  ctx.fillText('Score: ' + score, 35, 60)

  requestAnimationFrame(main);
}
main();
