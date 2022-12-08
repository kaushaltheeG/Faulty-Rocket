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

const METEORITE = {
    SX: 562,
    SY: 600,
    SWIDTH: 1500,
    SHEIGHT: 1200,
    DX: 300,
    DY: 0,
    DWIDTH: 300,
    DHEIGHT: 300
}

export default class Mesosphere {
    constructor(ctx, canvas, rocket, platform, strikes) {
        this.ctx = ctx;
        this.canvas = canvas;
        this.rocket = rocket;
        this.platform = platform;
        this.strikes = strikes
        this.background = new Image();
        this.assignSrcs();
        this.loadLife();
        this.animate(true);
    }

    animate(idle) {
        //have the meteorites entering the exiting the frame 
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        this.ctx.drawImage(this.background, 0, 0, this.canvas.width, this.canvas.height);
        this.meteorites.forEach(meteorite => {
            meteorite.draw(this.ctx);
            meteorite.moveDown();
        })
        this.ctx.drawImage(this.platform, PLATFORM.DX, PLATFORM.DY, PLATFORM.DWIDTH, PLATFORM.DHEIGHT)
        if (idle) this.ctx.drawImage(this.rocket, ROCKET_INIT.SX, ROCKET_INIT.SY,
            ROCKET_INIT.SWIDTH, ROCKET_INIT.SHEIGHT,
            ROCKET_INIT.DX, ROCKET_INIT.DY,
            ROCKET_INIT.DWIDTH, ROCKET_INIT.DHEIGHT);
        if (this.strikes >= 3) {
            this.ctx.font = "50px Rockwell";
            this.ctx.fillStyle = 'red'
            this.ctx.fillText('GAME OVER', 250, 325, this.canvas.width)
            this.ctx.font = "oblique 20px Verdana";
            this.ctx.fillStyle = 'black'
            this.ctx.fillText('Click To Try Again', 250, 350, this.canvas.width)
        }
        this.ctx.font = "25px Rockwell";
        this.ctx.fillStyle = 'orange'
        this.ctx.fillText('MESOSPHERE', 400, 25, this.canvas.width)
        this.amountOfLives();
        if (idle) requestAnimationFrame(this.animate.bind(this));
    }

    assignSrcs() {
        this.background.src = './assests/mesosphere/mesos_background.png'
        this.meteorites = this.generateMeteorite();
    }

    generateMeteorite() {
        let meteorites = [];
        for (let i=1; i < 10; i++) {
            let src = Math.floor(Math.random() * 5)
            meteorites.push(new MovingObjects({
                pos: this.randomPos(),
                width: 300,
                height: 300,
                color: 'black',
                canvas: this.canvas,
                src: `./assests/mesosphere/meteorite_${src}.png`
            }))
        }
        return meteorites;
    }

    randomPos() {
        let x = Math.floor(Math.random() * 500)
        return [x, 0]
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