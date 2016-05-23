var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var backgroundImage = new Image();
backgroundImage.src = 'images/background.png';
var heroImage = new Image();
heroImage.src = 'images/hero.png';
var heroX = 200;
var heroY = 200;
var heroSpeed = 5;

//add monster to board
var monsterImage = new Image();
monsterImage.src = 'images/monster.png';
var monsterX = 300;
var monsterY = 300;
var monsterSpeed = 5;

window.addEventListener('keydown', function(event) {
  var key = event.keyCode;
  if (key === 37) { //left
    heroX -= heroSpeed;
  } else if (key === 39) { //right
    heroX += heroSpeed;
  } else if (key === 38) { //up
    heroY -= heroSpeed;
  } else if (key === 40) {
    heroY += heroSpeed;
  }

  if (heroX > 512) {
    heroX = 0;
  }
  if (heroX < 0) {
    heroX = 512;
  }
  if (heroY > 480) {
    heroY = 0;
  }
  if (heroY < 0) {
    heroY = 480;
  }

  console.log('heroX: ' + heroX);
});

function main () {
  ctx.drawImage(backgroundImage, 0, 0);
  ctx.drawImage(heroImage, heroX, heroY);
  monsterX += monsterSpeed;
  ctx.drawImage(monsterImage, monsterX, monsterY);
  requestAnimationFrame(main);
}
main();
