var snake = null;
var scale;

var food;
var stopped = false;
var speed = 10;


function setup() {
  createCanvas(600,600);
  frameRate(this.speed);
 
  this.scale = 20;
  this.pickLoction();
  
  snake = new Snake();
}

function pickLoction() {
  var cols = floor(width/scale);
  var rows = floor(height/scale);
  
  food = createVector(floor(random(cols)), floor(random(rows)));
  food.mult(scale);
}

function deadState() {
  textSize(72);
  textAlign(CENTER, CENTER);
  text('You died', (width / 2), (height / 2));
  
  textSize(18);
  text('Press space to play again', (width / 2), (height / 2) +50 );
  
  this.stopped = true;
}

function reset() {
  snake.reset();
  this.pickLoction();
  
  this.stopped = false;
}

function draw() {
  background(51);
  frameRate(this.speed);
 
  // snake
  textSize(24);
  textAlign(CENTER, CENTER);
  text('Score: ' + snake.total, 50, 20);
  
  
  snake.update(scale);
  if(snake.isDead()) {
    this.deadState();
    this.speed = 10;
    return; 
  }
  
  snake.show();
  
  if(snake.eat(food)){
    this.pickLoction();
    this.speed = this.speed +1;
  }
  
  // Food
  fill(255, 0, 100);
  rect(food.x, food.y, scale, scale);
}

function keyPressed() {
  if(this.stopped === true)
  {
    if(keyCode === 32)
    {
      this.reset();
      return;
    }
    
    return;
  }
  
  if (keyCode === LEFT_ARROW) {
    snake.moveLeft();
  } else if (keyCode === RIGHT_ARROW) {
    snake.moveRight();
  } else if (keyCode === UP_ARROW) {
    snake.moveUp();
  } else if (keyCode === DOWN_ARROW) {
    snake.moveDown();
  }
}

function mousePressed() {  
  snake.total = snake.total +1;
}

function Snake() {
  this.x = 0;
  this.y = 0;
  this.xspeed = 1;
  this.yspeed = 0;
  this.total = 0;
  this.tail = [];
  
  this.eat = function(food) {
    var distanceToFood = dist(this.x, this.y, food.x, food.y);
    if(distanceToFood < 1) {
      this.total = ++this.total;
      return true;
    }
    return false;
  };
  
  this.isDead = function() {
    for(var i = 0; i < this.tail.length; i++)
    {
      var pos = this.tail[i];
      var d = dist(this.x, this.y, pos.x, pos.y);
      if(d < 1) {
        return true;
      }
    }
    
    if(this.x > height -1 ) {
      return true;
    } else if(this.x < 0) {
      return true;
    }
    
    if(this.y > width -1) {
      return true;
    } else if(this.y < 0) {
      return true;
    }
    
    return false;
  };
  
  this.reset = function() {
     this.total = 0;
     this.tail = [];
     this.spawn();
  };
  
  this.spawn = function() {
    var cols = floor(width/scale);
    var rows = floor(height/scale);
    
    var pos = createVector(floor(random(cols)), floor(random(rows)));
    pos.mult(scale);
    
    this.x = pos.x;
    this.y = pos.y;
    
  };
  
  this.update = function(scale){
      if(this.total === this.tail.length) {
        for(var i = 0; i < this.total-1; i++) {
          this.tail[i] = this.tail[i+1];
        }
      }
      
      this.tail[this.total-1] = createVector(this.x, this.y);

      this.x = this.x + (this.xspeed * scale);
      this.y = this.y + (this.yspeed * scale);
      
      this.x = constrain(this.x, 0, width-scale);
      this.y = constrain(this.y, 0, height-scale);
  };
  
  this.moveUp = function(){
    if(this.yspeed === 1){ 
      return;
    }
    
    this.yspeed = -1;
    this.xspeed = 0;
  };
  
  this.moveDown = function(){
    if(this.yspeed === -1){ 
      return;
    }
    
    this.yspeed = 1;
    this.xspeed = 0;
  };
  
  this.moveLeft = function(){
    if(this.xspeed === 1){ 
      return;
    }
    
    this.xspeed = -1;
    this.yspeed = 0;
  };
  
  this.moveRight = function(){
    if(this.xspeed === -1){ 
      return;
    }
    
    this.xspeed = 1;
    this.yspeed = 0;
  };
  
  this.show = function(){
    fill(255);
    for(var i = 0; i < this.tail.length; i++){
      rect(this.tail[i].x, this.tail[i].y, scale, scale);
    }
    
    rect(this.x, this.y, scale, scale);
  };
  
  this.reset();
}
