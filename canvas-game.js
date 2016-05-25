var score = 0;
var highScore = 0;

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

//add game board
var backgroundImage = new Image();
backgroundImage.src = 'images/background.png';

//add hero to board
var heroImage = new Image();
heroImage.src = 'images/donkeykong.png';
var hero = {
  x: 200,
  y: 200,
  dirX: 0,
  dirY: 0,
  speed: 2
};

//add monster to board
var monsterImage = new Image();
monsterImage.src = 'images/banana.png';
var monster = {
  x: 300,
  y: 300,
  dirX: 1,
  dirY: 0,
  speed: 1
};

//add 2 goblins to board
var goblinImage = new Image();
goblinImage.src = 'images/barrel.png';
var goblins = [
  {
    x: 150,
    y: 150,
    dirX: 1,
    dirY: 0,
    speed: 1
  },
  {
    x: 250,
    y: 250,
    dirX: 1,
    dirY: 0,
    speed: 1
  }
];

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

//detect collisions
function collision(enemy) {
  if (hero.x + 32 < enemy.x) {
    return false;
  } else if (enemy.x + 32 < hero.x) {
    return false;
  } else if (hero.y + 32 < enemy.y) {
    return false;
  } else if (enemy.y + 32 < hero.y) {
    return false;
  }
  return true;
}

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

function updateEnemy(enemy) {
  //change enemy direction
  if (counter % 50 === 0) {
    enemy.dirX = Math.floor(Math.random() * 3) -1;
    enemy.dirY = Math.floor(Math.random() * 3) -1;
  }
  //update enemy position
  enemy.x += enemy.dirX * enemy.speed;
  enemy.y += enemy.dirY * enemy.speed;
  handleWrapping(enemy);
}

var counter = 0;
function main () {
  counter++;
  ctx.drawImage(backgroundImage, 0, 0);
  ctx.drawImage(heroImage, hero.x, hero.y);

  //hero position
  hero.x += hero.dirX * hero.speed;
  hero.y += hero.dirY * hero.speed;

  updateEnemy(monster);
  if (collision(monster)) {
    score++;
    if (score > highScore) {
      highScore = score;
    }
    document.getElementById('message').innerHTML = "you got a banana!";
    monster.x = Math.random() * 512;
    monster.y = Math.random() * 480;
  }
  ctx.drawImage(monsterImage, monster.x, monster.y);

  for (var i = 0; i < goblins.length; i++) {
    var goblin = goblins[i];
    updateEnemy(goblin);
    if (collision(goblin)) {
      score = 0;
      document.getElementById('message').innerHTML = "oh shoot - a barrel got ya";
      hero.x = 200;
      hero.y = 200;
      goblin.x = Math.random() * 512;
      goblin.y = Math.random() * 480;
      break;
    }
    ctx.drawImage(goblinImage, goblin.x, goblin.y);
  }

  //add score
  ctx.font = "16px sans-serif";
  ctx.fillStyle = "white"
  ctx.fillText('Score: ' + score, 35, 47)
  ctx.fillText('High Score: ' + highScore, 35, 65)

  requestAnimationFrame(main);
}
main();
