var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var backgroundImage = new Image();
backgroundImage.src = 'images/background.png';
var heroImage = new Image();
heroImage.src = 'images/hero.png';
var hero = {
  x: 200,
  y: 200
}
var heroSpeed = 5;

//add monster to board
var monsterImage = new Image();
monsterImage.src = 'images/monster.png';
var monster = {
  x: 300,
  y: 300
}
var monsterSpeed = 5;

window.addEventListener('keydown', function(event) {
  var key = event.keyCode;
  if (key === 37) { //left
    hero.x -= heroSpeed;
  } else if (key === 39) { //right
    hero.x += heroSpeed;
  } else if (key === 38) { //up
    hero.y -= heroSpeed;
  } else if (key === 40) {
    hero.y += heroSpeed;
  }

  handleWrapping(hero);
});

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

function main () {
  ctx.drawImage(backgroundImage, 0, 0);
  ctx.drawImage(heroImage, hero.x, hero.y);
  monster.x += monsterSpeed;
  handleWrapping(monster);
  ctx.drawImage(monsterImage, monster.x, monster.y);
  requestAnimationFrame(main);
}
main();
