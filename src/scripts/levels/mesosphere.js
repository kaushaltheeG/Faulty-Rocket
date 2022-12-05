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

export default class Mesosphere {
    constructor(ctx, canvas, rocket, platform) {
        this.ctx = ctx;
        this.canvas = canvas;
        this.rocket = rocket;
        this.platform = platform;
        this.background = new Image();
        this.meteorite1 = new Image();
        this.meteorite2 = new Image();
        this.meteorite3 = new Image();
        this.meteorite4 = new Image();
        this.meteorite5 = new Image();
        this.assignSrcs();
        this.animate();
    }

    animate() {
        //have the meteorites entering the exiting the frame 
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        this.ctx.drawImage(this.background, 0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.platform, PLATFORM.DX, PLATFORM.DY, PLATFORM.DWIDTH, PLATFORM.DHEIGHT)
        this.ctx.drawImage(this.rocket, ROCKET_INIT.SX, ROCKET_INIT.SY,
            ROCKET_INIT.SWIDTH, ROCKET_INIT.SHEIGHT,
            ROCKET_INIT.DX, ROCKET_INIT.DY,
            ROCKET_INIT.DWIDTH, ROCKET_INIT.DHEIGHT);
        requestAnimationFrame(this.animate.bind(this));
    }

    assignSrcs() {
        this.background.src = './assests/mesosphere/mesos_background.png'
        this.meteorite1.src = './assests/mesosphere/meteorite_1.png'
        this.meteorite2.src = './assests/mesosphere/meteorite_2.png'
        this.meteorite3.src = './assests/mesosphere/meteorite_3.png'
        this.meteorite4.src = './assests/mesosphere/meteorite_4.png'
        this.meteorite5.src = './assests/mesosphere/meteorite_5.png'
    }


}