import MovingObjects from "./movingObjects";

const ROCKET_INIT = {
    SX: 0,
    SY: 0,
    SWIDTH: 135,
    SHEIGHT: 145,
    DX: 215,
    DY: 575,
    DWIDTH: 100,
    DHEIGHT: 150
}

const PLATFORM = {
    DX: 50,
    DY: 400,
    DWIDTH: 400,
    DHEIGHT: 400
}


export default class Thermosphere {
    constructor(ctx, canvas, rocket, platform, strikes) {
        this.ctx = ctx;
        this.canvas = canvas;
        this.rocket = rocket;
        this.strikes = strikes;
        this.platform = platform;
        this.backgroundSpeed = 1; 
        this.assignSrcs();
        this.loadLife();
        this.animate(true);
    }

    animate(idle) { 
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        this.background.draw(this.ctx);
        // this.moveBackground();
        this.ctx.drawImage(this.platform, PLATFORM.DX, PLATFORM.DY, PLATFORM.DWIDTH, PLATFORM.DHEIGHT)
        if (idle) {
            this.ctx.drawImage(this.rocket, ROCKET_INIT.SX, ROCKET_INIT.SY,
            ROCKET_INIT.SWIDTH, ROCKET_INIT.SHEIGHT,
            ROCKET_INIT.DX, ROCKET_INIT.DY,
            ROCKET_INIT.DWIDTH, ROCKET_INIT.DHEIGHT);
        }
        if (this.strikes >= 3) {
            this.ctx.font = "50px Rockwell";
            this.ctx.fillStyle = 'red'
            this.ctx.fillText('GAME OVER', 100, 325, this.canvas.width)
        }
        this.amountOfLives();
        // this.ctx.drawImage(this.background, 0, 0, 500, 750);
        if (idle) requestAnimationFrame(this.animate.bind(this));
    }

    assignSrcs() {
        this.background = new MovingObjects({
            pos: [0,0],
            width: this.canvas.width,
            height: this.canvas.height,
            color: 'black',
            canvas: this.canvas,
            src: `./assests/thermosphere/thermo-background.jpg`
        })
    }

    moveBackground() {
        console.log(this.background.pos);
        if (this.background.pos[0] > this.background.width) this.background.pos[0] = 0;
        else this.background.pos[0] += this.backgroundSpeed;
    }
    loadLife() {
        this.life = new Image();
        this.life.src = './assests/life.png'
    }

    amountOfLives() {
        if (this.strikes === 0) {
            this.ctx.drawImage(this.life, 0, 0, 335, 335, 0, 700, 50, 50)
            this.ctx.drawImage(this.life, 0, 0, 335, 335, 50, 700, 50, 50)
            this.ctx.drawImage(this.life, 0, 0, 335, 335, 100, 700, 50, 50)
        } else if (this.strikes === 1) {
            this.ctx.drawImage(this.life, 0, 0, 335, 335, 0, 700, 50, 50)
            this.ctx.drawImage(this.life, 0, 0, 335, 335, 50, 700, 50, 50)
        } else if (this.strikes === 2) {
            this.ctx.drawImage(this.life, 0, 0, 335, 335, 0, 700, 50, 50)
        }
    }






}