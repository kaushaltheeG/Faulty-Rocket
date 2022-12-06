import Vector from "./vector";

import Base from "./levels/base";
import Troposphere from "./levels/troposphere";
import Stratosphere from "./levels/stratosphere";
import Mesosphere from "./levels/mesosphere";
import Thermosphere from "./levels/thermosphere";
import Exosphere from "./levels/exosphere";

const spriteWidth = 135;
const spriteHeight = 145; 

export default class Rocket {
    constructor(wpm, ctx, level) {
        this.wpm = wpm; 
        this.ctx = ctx; 
        this.level = level;
        this.passingWpm = this.level.passingWpm;
        this.color = "red";
        this.width =  50;
        this.height = 75; 
        this.rocketSprite = new Image();
        this.totalDistanceAndAcceleration();
        // this.rocketSprite.onload = this.loadImages(); 
        this.spriteDimentions();
        this.canvas = document.getElementById("rocket-canvas")
        this.acceleration = new Vector(0, this.accelerationDeltaY)
        this.reset();
        this.currentLevel = this.whichLevel(this.level.state)
        //this.whichLevel(this.level.state); //this.level.state)
    }

    reset() {
        this.pos = new Vector((this.canvas.width - this.width) / 2, ((this.canvas.height - 75) - this.height))
        this.velocity = new Vector(0, 0);
    }

    whichLevel(state) { //state
        // new Troposphere(this.ctx, this.canvas, this.level.rocket, this.level.platform);
        switch (state) {
            case 0: //base
                return this.base;                
            case 1: //troposphere
                return this.level.tropo 
                
            case 2: //stratosphere
                return this.level.strato; 
                
            case 3: //Mesosphere
                return this.level.meso;

            case 4: //Thermosphere
                return this.level.thermo; 
        }
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
        console.log(this.level.state);
        if (this.level.state !== 0) this.currentLevel.animate(false);
        // this.ctx.fillStyle = this.color;
        // this.ctx.fillRect(this.pos.x, this.pos.y, this.width, this.height)
        // Draw an individual sprite from the sprite sheet
        //ctx.drawImage(spriteSheet, sx, sy, sWidth, sHeight, x, y, width, height);
        this.ctx.drawImage(this.rocketSprite, 145, 0, 
            spriteWidth, spriteHeight,
            this.pos.x, this.pos.y, 100, 150)
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
        this.rocketSprite.src = "./assests/rocket_spriteSheet_final.png";
        if (this.wpm >= this.passingWpm) {
            this.accelerationDeltaY = -.15
            this.yAxisStopPos = (this.height + 2) * -1;
            this.passedLevel = true;
            // this.rocketSprite.src = "./assests/rocket_spriteSheet_final.png";
        } else if (this.wpm < this.passingWpm && this.wpm >= (this.passingWpm/2)) {
            this.accelerationDeltaY = -.015;
            this.yAxisStopPos = 137.5;
            this.passedLevel = false;
            // this.rocketSprite.src = "./assests/rocket_boom.png"
        } else {
            this.accelerationDeltaY = -.0015;
            this.yAxisStopPos = 412.5;
            this.passedLevel = false; 
            // this.rocketSprite.src = "./assests/rocket_boom.png"
        }
    }

    loadImages() {
        let numOfImages = 1;
        if (--numOfImages > 0) return;
    }

    spriteDimentions() {
        /* 
        x moves by 145px 
            for row 1: max x is 440 while y is 0
            for row 2: max is 294 while y at 150
            for row 3: max is 440 while y is 286
        y moves down by 150
            for row 1: max x is 440 while y is 0
            for row 2: max is 294 while y at 150
            for row 3: max is 440 while y is 300 but says 286 on crop
        */

        
    }
    

   
    


}