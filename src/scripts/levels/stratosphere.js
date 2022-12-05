import MovingObjects from "./movingObjects";

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
        this.clouds.forEach(cloud => {
            cloud.draw(this.ctx);
            cloud.moveHoz();
        })
        this.balloons.forEach(balloon => {
            balloon.draw(this.ctx);
            balloon.moveHoz();
        })
        // this.ctx.drawImage(this.weatherBallon, 0,0, 200, 300, 300, 150, 50, 200);
        requestAnimationFrame(this.animate.bind(this));
    }

    assignSrcs() {
        this.background.src = './assests/stratosphere/stratoBackground_complete.png'
        this.clouds = this.generateClouds();
        this.balloons = this.generateBallons();
    }

    generateClouds() {
        let clouds = [];
        for (let i = 1; i < 4; i++) {
            clouds.push(new MovingObjects({
                pos: this.randomPos(300),
                width: 100,
                height: 50,
                color: 'black',
                canvas: this.canvas,
                src: `./assests/stratosphere/cloud${i}.png`
            }))
        }
        return clouds;
    }

    generateBallons() {
        let balloons = [];
        for (let i=0; i<4; i++) {
            balloons.push(new MovingObjects({
                pos: this.randomPos(150),
                width: 50,
                height: 200,
                color: 'black',
                canvas: this.canvas,
                src: `./assests/stratosphere/weather-balloon.png`
            }))
        }
        return balloons
    }

    randomPos(height) {
        let x = Math.floor(Math.random() * 500)
        let y = Math.floor(Math.random() * height);
        return [x, y]
    }
}