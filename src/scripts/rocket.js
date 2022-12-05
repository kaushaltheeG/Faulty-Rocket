import Vector from "./vector";


export default class Rocket {
    constructor(wpm, ctx, passingWpm) {
        this.wpm = wpm; 
        this.ctx = ctx; 
        this.passingWpm = passingWpm;
        this.color = "red";
        this.width =  50;
        this.height = 75; 
        this.rocketSprite = new Image();
        this.totalDistanceAndAcceleration();
        // this.rocketSprite.onload = this.loadImages(); 
        this.spriteDimentions();
        console.log(this.rocketSprite.src);
        this.canvas = document.getElementById("rocket-canvas")
        this.acceleration = new Vector(0, this.accelerationDeltaY)
        this.reset();
    }

    reset() {
        this.pos = new Vector((this.canvas.width - this.width) / 2, ((this.canvas.height - 75) - this.height))
        this.velocity = new Vector(0, 0);
    }

    animate(callback) {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        //for platform 
        this.ctx.clearRect(100, 675, 300, 75)
        this.ctx.beginPath();
        this.ctx.rect(100, 675, 300, 75);
        this.ctx.fillStyle = 'grey'
        this.ctx.stroke();
        this.velocity.add(this.acceleration);
        this.pos.add(this.velocity);
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(this.pos.x, this.pos.y, this.width, this.height)
        // Draw an individual sprite from the sprite sheet
        //ctx.drawImage(spriteSheet, sx, sy, sWidth, sHeight, x, y, width, height);
        // this.ctx.drawImage(this.rocketSprite, this.pos.x, this.pos.y, this.rocketSprite.width, this.rocketSprite.height)
        if (this.inbounds(this.pos.x, this.pos.y) && this.pos.y >= this.yAxisStopPos ) {
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
            this.rocketSprite.src = "./assests/rocket_launched.png"
        } else if (this.wpm < this.passingWpm && this.wpm >= (this.passingWpm/2)) {
            this.accelerationDeltaY = -.015;
            this.yAxisStopPos = 137.5;
            this.passedLevel = false;
            this.rocketSprite.src = "./assests/rocket_boom.png"
        } else {
            this.accelerationDeltaY = -.0015;
            this.yAxisStopPos = 412.5;
            this.passedLevel = false; 
            this.rocketSprite.src = "./assests/rocket_boom.png"
        }
    }

    loadImages() {
        let numOfImages = 1;
        if (--numOfImages > 0) return;
    }

    spriteDimentions() {
        this.cols = this.passedLevel ? 6 : 14;
        this.rows = 1;
        this.spriteWidth = this.rocketSprite.width / this.cols; 
        this.spriteHeight = this.rocketSprite.height / this.rows; 
        this.totalFrames = this.passedLevel ? 6 : 14;
        this.currentFrames = 0; 
        
    }
    

   
    


}