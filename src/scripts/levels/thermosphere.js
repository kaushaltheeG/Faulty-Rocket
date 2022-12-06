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
    constructor(ctx, canvas, rocket, platform) {
        this.ctx = ctx;
        this.canvas = canvas;
        this.rocket = rocket;
        this.platform = platform;
        this.backgroundSpeed = 1; 
        this.assignSrcs();
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






}