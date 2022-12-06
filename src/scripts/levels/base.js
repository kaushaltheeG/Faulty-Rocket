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

export default class Base {
    constructor(ctx, canvas, rocket, platform) {
        this.ctx = ctx;
        this.canvas = canvas;
        this.rocket = rocket;
        this.platform = platform;
        this.background = this.loadBackground();
        console.log(this.background);
        // this.assignSrcs();
        this.animate(true);
    }

    animate(idle) {
        //have weather ballons moving 
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        // this.ctx.drawImage(this.background, 0, 0);
        this.background.forEach((layer, i) => {
            if (i === 1 || i === 2) {
                layer.draw(this.ctx);
                layer.moveHozRight();
            } else {
                this.ctx.drawImage(layer, 0, 0, this.canvas.width, this.canvas.height)
            }
        })

        this.ctx.drawImage(this.platform, PLATFORM.DX, PLATFORM.DY, PLATFORM.DWIDTH, PLATFORM.DHEIGHT)
        if (idle) {
            this.ctx.drawImage(this.rocket, ROCKET_INIT.SX, ROCKET_INIT.SY,
                ROCKET_INIT.SWIDTH, ROCKET_INIT.SHEIGHT,
                ROCKET_INIT.DX, ROCKET_INIT.DY,
                ROCKET_INIT.DWIDTH, ROCKET_INIT.DHEIGHT);
        }

        if (idle) requestAnimationFrame(this.animate.bind(this));
    }

    // assignSrcs() {
    //     this.background.src = './assests/base/ '
    // }

    loadBackground() {
        let background = [];
        for (let i=1; i < 8; i++) {
            background.push(
                i === 2 || i === 3 ? new MovingObjects({
                    pos: [325, 0],
                    width: 100,
                    height: 50,
                    color: 'black',
                    canvas: this.canvas,
                    src: `./assests/base/${i}.png`
                    }) : new Image());
            if (i !== 2 || i !== 3) background[i-1].src = `./assests/base/${i}.png`
        }
        return background
    }


}