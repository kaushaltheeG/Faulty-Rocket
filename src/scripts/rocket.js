import Vector from "./vector";


const spriteWidth = 135;
const spriteHeight = 145; 

export default class Rocket {
    constructor(wpm, ctx, level) {
        this.wpm = wpm; 
        this.ctx = ctx; 
        this.level = level;
        this.passingWpm = this.level.passingWpm;
        this.color = "red";
        this.width =  50; //hitbox
        this.height = 75; //hitbox
        this.rocketSprite = new Image();
        this.totalDistanceAndAcceleration();
        this.canvas = document.getElementById("rocket-canvas")
        this.acceleration = new Vector(0, this.accelerationDeltaY)
        this.reset();
        this.currentLevel = this.whichLevel(this.level.state)

    }

    reset() {
        // Start Pos: DX: 215, DY: 575,
        this.pos = new Vector(215, 575)
        this.velocity = new Vector(0, 0);
    }

    whichLevel(state) { //state
        // new Troposphere(this.ctx, this.canvas, this.level.rocket, this.level.platform);
        switch (state) {
            case 0: //base
                return this.level.base;                
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

        //Upward trajectory
        this.velocity.add(this.acceleration);
        this.pos.add(this.velocity);

        //background animatation 
        this.currentLevel.animate(false);

        //rocket animation 
        if (!this.passedLevel && (this.pos.y <= this.engineFailPos && this.pos.y > this.explosionPos)) {
            this.renderEngineFailure();
            // console.log(this.);
            this.ctx.drawImage(this.rocketSprite, this.sx, this.sy,
                spriteWidth, spriteHeight,
                this.pos.x, this.pos.y, 100, 150)
        } else if (!this.passedLevel && this.pos.y <= this.explosionPos) {
            this.renderExplosion();
            // console.log(this.);
            this.ctx.drawImage(this.rocketSprite, this.sx, this.sy,
                spriteWidth, spriteHeight,
                this.pos.x, this.pos.y, 100, 150)
        } else {
            this.ctx.drawImage(this.rocketSprite, this.sx, this.sy, 
                spriteWidth, spriteHeight,
                this.pos.x, this.pos.y, 100, 150)
        }

        //within bounds check 
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
        this.sx = 145;
        this.sy = 0; 

        if (this.wpm >= this.passingWpm) {
            this.accelerationDeltaY = -.15
            this.yAxisStopPos = (this.height + 2) * -1;
            this.passedLevel = true;

        } else if (this.wpm < this.passingWpm && this.wpm >= (this.passingWpm/2)) {
            this.accelerationDeltaY = -.015;
            this.yAxisStopPos = 137.5;
            this.passedLevel = false;
            this.engineFailPos = 400;
            this.explosionPos = 200;
        } else {
            this.accelerationDeltaY = -.0015;
            this.yAxisStopPos = 412.5;
            this.passedLevel = false; 
            this.engineFailPos = 450;
            this.explosionPos = 430;

        }
    }

    loadImages() {
        let numOfImages = 1;
        if (--numOfImages > 0) return;
    }

    renderEngineFailure() {
        if (this.sx < 435 && !this.sy) {
            //top row 
            this.sx += 145
        } else if (this.sx >= 435 && !this.sy) {
            //looked at top row and moving down to second row
            this.sx = 290;
        }
    }

    renderExplosion() {
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
    //    console.log(`sx: ${this.sx} sy: ${this.sy}`);

        if (this.sx < 435 && !this.sy) {
           //top row 
           this.sx += 145
        } else if (this.sx >= 435 && !this.sy) {
            //looked at top row and moving down to second row
            this.sx = 0;
            this.sy += 150; 
        } else if (this.sx < 290 && this.sy === 150) {
            //looks at second row 
            this.sx += 145
        } else if (this.sx >= 290 && this.sy === 150) {
            //finished and moving on to last row 
            this.sx = 0;
            this.sy += 150
        } else if (this.sx < 435 && this.sy === 300) {
            //looking thru last row 
            this.sx += 145
        }
        
    }
    

   
    


}