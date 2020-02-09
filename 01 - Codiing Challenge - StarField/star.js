class Star {
    x;
    y;
    z;
    size;
    
    pz;
    px;
    py;
    sx;
    sy;

    constructor(){
        this.resetStar();
        this.size = 16;
    }

    resetStar(){
        this.x = random(-width, width);
        this.y = random(-height, height);
        this.z = random(width);

        this.pz = this.z;
    }

    update(speedModifier) {
        this.z = this.z - speedModifier;
        if(this.z < 1){
            this.resetStar();
            return;
        }

        // Calculate speed
        this.sx = map(this.x / this.z, 0, 1, 0, width);
        this.sy = map(this.y / this.z, 0, 1, 0, height);

        // Calculate start positions of stroke
        this.px = map(this.x / this.pz, 0, 1, 0, width);
        this.py = map(this.y / this.pz, 0, 1, 0, height);
    }

    draw() {
        fill(255);
        noStroke();

        // Draw star
        var sizeOfStar = map(this.z, 0, width, this.size, 0);
        ellipse(this.sx, this.sy, sizeOfStar,sizeOfStar);

        // Draw trailing line
        stroke(255);
        line(this.px, this.py, this.sx, this.sy);
    }
}