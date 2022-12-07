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

export default class Stratosphere {
    constructor(ctx, canvas, rocket, platform, strikes) {
        this.ctx = ctx;
        this.canvas = canvas;
        this.rocket = rocket;
        this.platform = platform;
        this.strikes = strikes
        this.background = new Image();
        this.cloud1 = new Image();
        this.cloud2 = new Image();
        this.cloud3 = new Image();
        this.weatherBallon = new Image();
        this.assignSrcs();
        this.loadLife();
        this.animate(true);
    }

    animate(idle) {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        this.ctx.drawImage(this.background, 0, 0);
        this.ctx.drawImage(this.platform, PLATFORM.DX, PLATFORM.DY, PLATFORM.DWIDTH, PLATFORM.DHEIGHT)
        
        if (idle) this.ctx.drawImage(this.rocket, ROCKET_INIT.SX, ROCKET_INIT.SY,
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
        if (this.strikes >= 3) {
            this.ctx.font = "50px Rockwell";
            this.ctx.fillStyle = 'red'
            this.ctx.fillText('GAME OVER', 100, 325, this.canvas.width)
        }
        this.amountOfLives();
        // this.ctx.drawImage(this.weatherBallon, 0,0, 200, 300, 300, 150, 50, 200);
        if (idle) requestAnimationFrame(this.animate.bind(this));
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