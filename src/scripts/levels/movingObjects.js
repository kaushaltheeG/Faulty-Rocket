

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
        this.pos[0] --;
        if (!this.inbounds(this.pos[0], this.pos[1])) {
            this.pos[0] = 500;
            this.pos[1] = Math.floor(Math.random() * 300);
        }
    }

    moveHozRight() {
        // console.log(this.pos)
        this.pos[0] +=  0.1;
        if (!this.inbounds(this.pos[0], this.pos[1])) {
            this.pos[0] = -200;
            this.pos[1] = 300;
        }
    }

    movePurelyDowm() {
        this.pos[1] += 1;
        if (!this.inbounds(this.pos[0], this.pos[1])) {
            this.pos[0] = 0;
            this.pos[1] = -700;
        }
    }

    moveDown() {
        this.pos[0]--;
        this.pos[1]++;
        if (!this.inbounds(this.pos[0], this.pos[1])) {
            this.pos[0] = 500;
            this.pos[1] = Math.floor(Math.random() * 300);
        }
    }

    moveUpAndDown(up) {
        if (up) {
            this.pos[1] += 5;
        } else {
            this.pos[1] -= 5;
        }

    }

    

    moveUp() {
        // this.pos[0] ;
        this.pos[1] += 0.01;
        if (!this.inbounds(this.pos[0], this.pos[1])) {
            this.pos[0] = -100;
            this.pos[1] = -100;
        }
    }

    moveDiagonalDown() {
        this.pos[0] += 0.25;
        this.pos[1] += 0.25;
        if (!this.inbounds(this.pos[0], this.pos[1])) {
            this.pos[0] = -100;
            this.pos[1] = Math.floor(Math.random() * 300);
        }
    }

    moveDiagonalUp() {
        this.pos[0] -= 0.5;
        this.pos[1] -= 0.5;
        if (!this.inbounds(this.pos[0], this.pos[1])) {
            this.pos[0] = 600;
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