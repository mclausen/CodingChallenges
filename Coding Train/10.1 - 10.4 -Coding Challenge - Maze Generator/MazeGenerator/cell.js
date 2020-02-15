var i, j = 0;
var walls = [];
var visited;

function Cell(i, j)
{
  this.i = i;
  this.j = j;
  this.visited = false;
  
  // TOP, RIGHT; BOTTOM, LEFT
  this.walls = [true, true, true, true];
  
  this.highlight = function() {
    var x = this.i * w;
    var y = this.j * w;
    noStroke();
    fill(0,0,255,100);
    rect(x, y, w, w);
  };
  
  this.checkNeighbors = function() {
    var top      = grid[index(this.i, this.j - 1)];
    var right    = grid[index(this.i + 1, this.j)];
    var bottom   = grid[index(this.i, this.j + 1)];
    var left     = grid[index(this.i - 1, this.j)];
    
    var neighbors = [];
    if(top && top.visited == false) {
      neighbors.push(top);
    }
    
    if(right && right.visited == false) {
      neighbors.push(right);
    }
    
    if(bottom && bottom.visited == false) {
      neighbors.push(bottom);
    }
    
    if(left && left.visited == false) {
      neighbors.push(left);
    }
    
    if(neighbors.length > 0) { 
      var r = floor(random(0, neighbors.length));
      return neighbors[r];
    } else {
      return undefined;
    }
  };
    
  this.show = function() {
    var x = this.i * w;
    var y = this.j * w;
    
    stroke(255);
    if(this.walls[0])
    {
      line(x, y, x + w, y); // Top
    }
      
    if(this.walls[1])
    {
      line(x + w, y, x + w, y + w); // Right
    }
    if(this.walls[2])
    {
      line(x + w, y + w, x, y +w); // Bottom
    }
  
    if(this.walls[3])
    {
      line(x, y +w, x, y); // Left
    }
    
    if(this.visited) {
      noStroke();
      fill(255, 0, 255, 100);
      rect(x, y, w, w);
    }
  };
  
  this.removeTopWall = function() {
    this.walls[0] = false;
  };
  
  this.removeRightWall = function() {
    this.walls[1] = false;
  };
  
  this.removeBottomWall = function() {
    this.walls[2] = false;
  };
  
  this.removeLeftWall = function() {
    this.walls[3] = false;
  };
}
