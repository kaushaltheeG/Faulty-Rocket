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
    constructor(ctx, canvas, rocket, platform, strikes) {
        this.ctx = ctx;
        this.canvas = canvas;
        this.rocket = rocket;
        this.platform = platform;
        this.strikes = strikes;
        this.background = this.loadBackground();
        this.layerZero = new Image();
        this.loadLife();
        this.animate(true);
    }

    animate(idle) {

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        // this.ctx.drawImage(this.layerZero, 0, 0, this.canvas.width, this.canvas.height);
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
        if (this.strikes >= 3) {
            this.ctx.font = "oblique 50px Verdana";
            this.ctx.fillStyle = 'red'
            this.ctx.fillText('GAME OVER', 100, 325, this.canvas.width)
            // this.ctx.fillText('Click To Play Again', 0, 730)
            this.ctx.font = "oblique 20px Verdana";
            this.ctx.fillStyle = 'black'
            this.ctx.fillText('Click To Try Again', 160, 350, this.canvas.width)
        }

        this.ctx.font = "25px Rockwell";
        this.ctx.fillStyle = 'purple'
        this.ctx.fillText('BASE LVL', 375, 25, this.canvas.width)

        this.ctx.font = "oblique 20px Verdana";
        this.ctx.fillStyle = 'white'
        this.ctx.fillText('Base', 0, 0, this.canvas.width)
        this.amountOfLives()
        if (idle) requestAnimationFrame(this.animate.bind(this));
    }


    loadBackground() {
        const randPos = () => {
            return Math.floor(Math.random() * 500)
        }
        let background = [];
        for (let i=1; i < 8; i++) {
            background.push(
                i === 2 || i === 3 ? new MovingObjects({
                    pos: [randPos(),300],
                    width: 400,
                    height: 225,
                    color: 'black',
                    canvas: this.canvas,
                    src: `./assests/base/${i}.png`
                    }) : new Image());

            if (i !== 2 || i !== 3) {background[i-1].src = `./assests/base/${i}.png`}
            

        }
        return background
    }

    // moreClouds() {
    //     this.background.push(new MovingObjects({
    //             pos: [randPos(), 300],
    //             width: 400,
    //             height: 225,
    //             color: 'black',
    //             canvas: this.canvas,
    //             src: `./assests/base/${i}.png`
    //         })
    //     }
    // }

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