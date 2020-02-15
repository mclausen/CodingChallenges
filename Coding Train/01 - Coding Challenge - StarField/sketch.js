var numberOfStars = 1000;
var stars = new Array(numberOfStars);
var speedModifier;

function setup() {
  createCanvas(800, 800);
  for(var i = 0; i < stars.length; i++){
    stars[i] = new Star();
  } 
}

function draw() {
  speedModifier = map(mouseX, 0, width, 0, 20);

  background(0);

  translate(width / 2, height / 2);
  for(var i = 0; i < stars.length; i++){
    stars[i].update(speedModifier);
    stars[i].draw();
  } 
}