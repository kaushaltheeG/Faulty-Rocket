import Vector from "./vector";
import Game from "./game";

export default class Rocket {
    constructor(wpm, ctx, passingWpm) {
        this.wpm = 10; 
        this.ctx = ctx; 
        this.passingWpm = passingWpm;
        this.color = "red";
        this.width =  50;
        this.height = 75; 
        this.totalDistanceAndAcceleration();
        this.canvas = document.getElementById("rocket-canvas")
        console.log(this.accelerationDeltaY)
        this.acceleration = new Vector(0, this.accelerationDeltaY)
        this.reset();
    }

    reset() {
        this.pos = new Vector((this.canvas.width - this.width) / 2, ((this.canvas.height - 75) - this.height))
        this.velocity = new Vector(0, 0);
    }

    animate(callback) {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        this.ctx.clearRect(100, 675, 300, 75)
        // this.ctx.fillStyle = 'grey'
        // this.ctx.fillRect(100, 675, 300, 75);
        this.ctx.beginPath();
        this.ctx.rect(100, 675, 300, 75);
        this.ctx.fillStyle = 'grey'
        this.ctx.stroke();
        this.velocity.add(this.acceleration);
        this.pos.add(this.velocity);
        this.ctx.fillStyle = this.color;
        console.log('running');
        this.ctx.fillRect(this.pos.x, this.pos.y, this.width, this.height)
        if (this.inbounds(this.pos.x, this.pos.y) && this.pos.y > this.yAxisStopPos ) {
            requestAnimationFrame(this.animate.bind(this, callback));
        } else {
            callback();
        }
        
    }

    inbounds(x, y) {
        if (x > this.canvas.width || (x + this.width) < 0 || (y + this.height) < 0 || y > this.canvas.height){
            return false;
        } else {
            return true; 
        }
    }

    


    totalDistanceAndAcceleration() {
        if (this.wpm >= this.passingWpm) {
            this.accelerationDeltaY = -.15
            this.yAxisStopPos = (this.height + 2) * -1;
            this.passedLevel = true;
        } else if (this.wpm < this.passingWpm && this.wpm > (this.passingWpm/2)) {
            this.accelerationDeltaY = -.015;
            this.yAxisStopPos = 137.5;
            this.passedLevel = false;
        } else {
            this.accelerationDeltaY = -.0015;
            this.yAxisStopPos = 412.5;
            this.passedLevel = false; 
        }
    }
    

   
    


}