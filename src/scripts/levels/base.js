const ROCKET_INIT = {
    SX: 0,
    SY: 0,
    SWIDTH: 140,
    SHEIGHT: 150,
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

export default class Base {
    constructor(ctx, canvas, rocket, platform) {
        this.ctx = ctx;
        this.canvas = canvas;
        this.rocket = rocket;
        this.platform = platform;
        this.background = new Image();
        this.assignSrcs();
        this.animate();
    }

    animate() {
        //have weather ballons moving 
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        this.ctx.drawImage(this.background, 0, 0);
        requestAnimationFrame(this.animate.bind(this));
    }

    assignSrcs() {
        this.background.src = './assests/base/ '
    }
}