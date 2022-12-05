

export default class MovingObjects {
    constructor(options) {
        this.pos = options.pos;
        this.width = options.width;
        this.height = options.height;
        this.color = options.color;
        this.canvas = options.canvas;
        this.i = new Image();
        this.i.src = options.src; 
    }

    // animate(ctx) {
    //     ctx.move();

    // }

    draw(ctx) {
        ctx.drawImage(this.i, this.pos[0], this.pos[1], this.width, this.height)
        // ctx.fillStyle = this.color;
        // ctx.fillRect(this.pos[0], this.pos[1], this.width, this.height)
    }
    
    moveHoz() {
        this.pos[0]--;
        if (!this.inbounds(this.pos[0], this.pos[1])) {
            this.pos[0] = 500;
            this.pos[1] = Math.floor(Math.random() * 300);
        }
    }

    moveBallonDown() {
        this.pos[0]--;
        this.pos[1]--;
        if (!this.inbounds(this.pos[0], this.pos[1])) {
            this.pos[0] = 500;
            this.pos[1] = Math.floor(Math.random() * 300);
        }
    }
    
    moveBallonUp() {
        this.pos[0]--;
        this.pos[1]++;
        if (!this.inbounds(this.pos[0], this.pos[1])) {
            this.pos[0] = 500;
            this.pos[1] = Math.floor(Math.random() * 300);
        }
    }

    inbounds(x, y) {
        if (x > this.canvas.width || (x + this.width) < 0 || (y + this.height) < 0 || y > this.canvas.height) {
            return false;
        } else {
            return true;
        }
    }




    
}