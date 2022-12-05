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
export default class Troposphere {

    constructor(ctx, canvas, rocket, platform) {
        this.ctx = ctx; 
        this.canvas = canvas; 
        this.background = new Image();
        this.rocket = rocket;
        this.platform = platform;
        this.assignSrcs();
        this.animate();
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        this.ctx.drawImage(this.background, 0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.platform, PLATFORM.DX, PLATFORM.DY, PLATFORM.DWIDTH, PLATFORM.DHEIGHT)
        this.ctx.drawImage(this.rocket, ROCKET_INIT.SX, ROCKET_INIT.SY, 
            ROCKET_INIT.SWIDTH, ROCKET_INIT.SHEIGHT, 
            ROCKET_INIT.DX, ROCKET_INIT.DY,
            ROCKET_INIT.DWIDTH, ROCKET_INIT.DHEIGHT);
        this.clouds.forEach(cloud => {
            cloud.draw(this.ctx);
            cloud.moveHoz();
        })

        requestAnimationFrame(this.animate.bind(this));
    }
    
    assignSrcs() {
        this.background.src = './assests/troposphere/tropoBackground.png'
        this.platform.src = './assests/launch-final.png'
        this.clouds = this.generateClouds();
    }

    generateClouds() {
        let clouds = [];
        for (let i=1; i < 9; i++) {
            clouds.push(new MovingObjects({
                pos: this.randomPos(),
                width: 100,
                height: 50,
                color: 'black',
                canvas: this.canvas,
                src: `./assests/troposphere/cloud${i}.png`
            }))
        }
        return clouds; 
    }

    randomPos() {
        let x = Math.floor(Math.random() * 500)
        let y = Math.floor(Math.random() * 300);
        return [x,y]
    }

    inbounds(x, y) {
        if (x > this.canvas.width || (x + this.width) < 0 || (y + this.height) < 0 || y > this.canvas.height) {
            return false;
        } else {
            return true;
        }
    }

    








}