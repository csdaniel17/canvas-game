var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var backgroundImage = new Image();
backgroundImage.src = 'images/background.png';
var heroImage = new Image();
heroImage.src = 'images/hero.png';
var heroX = 200;
var heroY = 200;
var heroSpeed = 5;

window.addEventListener('keydown', function(event) {
  var key = event.keyCode;
  console.log(key);
  if (key === 37) { //left
    heroX -= heroSpeed;
  } else if (key === 39) { //right
    heroX += heroSpeed;
  } else if (key === 38) { //up
    heroY -= heroSpeed;
  } else if (key === 40) {
    heroY += heroSpeed;
  }
});

function main () {
  ctx.drawImage(backgroundImage, 0, 0);
  ctx.drawImage(heroImage, heroX, heroY);
  requestAnimationFrame(main);
}
main();
