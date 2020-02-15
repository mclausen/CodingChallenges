var cols, rows;
var w = 20;

var grid = [];
var stack = [];
var current;

function setup() {
  createCanvas(800, 800);
  cols = floor(width/w);
  rows = floor(height/w);
  frameRate(60);
  
  for(var j = 0; j < rows; j++){
    for(var i = 0; i < cols; i++) {
      var cell = new Cell(i, j);
      this.grid.push(cell);
    } 
  }
  
  this.current = grid[0];
}


function draw() {
  background(51);
  
  fill(24);
  for(var i = 0; i < this.grid.length; i++) {
    grid[i].show();
  }
  
  this.current.visited = true;
  this.current.highlight();
  
  // Step 1
  var next = this.current.checkNeighbors();
  if(next) {
    
    next.visited = true;
    
    // Step 2
    this.stack.push(this.current);
    
    
    // Step 3
    removeWalls(this.current, next);
    
    // Step 4
    this.current = next;
  } else if (this.stack.length > 0) {
     this.current = this.stack.pop();
  }
  
  for(var t = 0; t < this.stack.length; t ++)
    {
      var n = this.stack[t];
      n.highlight();
    }
}

function removeWalls(a, b) {
  var x = a.i - b.i;
  var y = a.j - b.j;
  
  if(x === 1) {
    a.removeLeftWall();
    b.removeRightWall();
  } else if (x === -1) {
    a.removeRightWall();
    b.removeLeftWall();
  }
   
  if(y === 1) {
    a.removeTopWall();
    b.removeBottomWall();
  } else if (y === -1) { 
    a.removeBottomWall();
    b.removeTopWall();
  }
}

function index(i, j) {
  if(i < 0 || j < 0 || i > cols-1 || j > rows-1) {
    return -1;
  }
  
  return i + j * cols;
}
