var snake = null;
var scale;

var food;

function setup() {
  createCanvas(600,600);
  frameRate(10);
 
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

function draw() {
  background(51);
  
  // snake
  if(snake.isDead()) {
    snake.reset();
    this.pickLoction();
  }
  
  snake.update(scale);
  snake.show();
  
  if(snake.eat(food)){
    this.pickLoction();
  }
  
  // Food
  fill(255, 0, 100);
  rect(food.x, food.y, scale, scale);
}

function keyPressed() {
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
    this.yspeed = -1;
    this.xspeed = 0;
  };
  
  this.moveDown = function(){
    this.yspeed = 1;
    this.xspeed = 0;
  };
  
  this.moveLeft = function(){
    this.xspeed = -1;
    this.yspeed = 0;
  };
  
  this.moveRight = function(){
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
