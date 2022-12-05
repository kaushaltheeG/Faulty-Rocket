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

export default class Stratosphere {
    constructor(ctx, canvas, rocket, platform) {
        this.ctx = ctx;
        this.canvas = canvas;
        this.rocket = rocket;
        this.platform = platform;
        this.background = new Image();
        this.cloud1 = new Image();
        this.cloud2 = new Image();
        this.cloud3 = new Image();
        this.weatherBallon = new Image();
        this.assignSrcs();
        this.animate();
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        this.ctx.drawImage(this.background, 0, 0);
        this.ctx.drawImage(this.platform, PLATFORM.DX, PLATFORM.DY, PLATFORM.DWIDTH, PLATFORM.DHEIGHT)
        this.ctx.drawImage(this.rocket, ROCKET_INIT.SX, ROCKET_INIT.SY,
            ROCKET_INIT.SWIDTH, ROCKET_INIT.SHEIGHT,
            ROCKET_INIT.DX, ROCKET_INIT.DY,
            ROCKET_INIT.DWIDTH, ROCKET_INIT.DHEIGHT);
        requestAnimationFrame(this.animate.bind(this));
    }

    assignSrcs() {
        this.background.src = './assests/stratosphere/stratoBackground_complete.png'
        this.cloud1.src = './assests/stratosphere/cloud1.png'
        this.cloud2.src = './assests/stratosphere/cloud2.png'
        this.cloud3.src = './assests/stratosphere/cloud3.png'
        this.weatherBallon.src = './assests/stratosphere/weather-balloon.png'
    }
}