import Vector from "./vector";

export default class Rocket {
    constructor(wpm, ctx) {
        this.wpm = wpm; 
        this.ctx = ctx; 
        this.color = "red";
        this.width = 10;
        this.height = 20; 
        this.canvas = document.getElementById("rocket-canvas")
        this.acceleration = new Vector(0, -.15)
        this.reset();
    }

    animate() {
        console.log(this.canvas.style.backgroundColor);
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        this.velocity.add(this.acceleration);
        this.pos.add(this.velocity);
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(this.pos.x, this.pos.y, this.width, this.height)
        if (this.inbounds(this.pos.x, this.pos.y)) {
            requestAnimationFrame(this.animate.bind(this));
        }
    }

    inbounds(x, y) {
        if (x > this.canvas.width || (x + this.width) < 0 || (y + this.height) < 0 || y > this.canvas.height){
            return false;
        } else {
            return true; 
        }
    }

    

    reset() {
        this.pos = new Vector((this.canvas.width - this.width) / 2, (this.canvas.height - this.height))
        this.velocity = new Vector(0, 0);
    }

    


}