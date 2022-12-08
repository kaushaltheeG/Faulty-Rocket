import MovingObjects from "./movingObjects";

const spriteWidth = 135;
const spriteHeight = 145;

const ROCKET = {
    SX: 145,
    SY: 0,
    SWIDTH: 135,
    SHEIGHT: 145,
    DX: 215,
    DY: 575,
    DWIDTH: 100,
    DHEIGHT: 150,
    CENTER_POS: [200, 300]
}


export default class Exosphere {
    constructor(ctx, canvas, rocket) {
        this.ctx = ctx;
        this.canvas = canvas;
        this.background = new Image();
        this.stars = new MovingObjects({
            pos: [0, 0],
            width: this.canvas.width,
            height: this.canvas.height,
            color: 'black',
            canvas: this.canvas,
            src: './assests/exosphere/layers/parallax-space-stars.png'
        })
        this.rocket = new MovingObjects({
            pos: [200,700] ,
            width: ROCKET.DWIDTH, 
            height: ROCKET.DHEIGHT,
            color: 'red',
            canvas: this.canvas,
            src: rocket.src
        })
        this.up = true;
        this.upDown = true; 
        this.pathIdx = 0;
        this.ringPlanets = this.generateRingPlanets();
        this.twinPlanet = this.generateTwinPlanets();
        this.bigPlanet = new MovingObjects({
            pos: [200, 300],
            width: 300,
            height: 300,
            color: 'black',
            canvas: this.canvas,
            src: './assests/exosphere/layers/parallax-space-big-planet.png'
        });
        this.assignSrcs();
      
        this.animate();
    }

    animate() {
        //have the the plants(each with a different speed) enter and exit frame 
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        //background
        this.ctx.drawImage(this.background, 0, 0, 500, 750);
        //layer 1
        this.stars.draw(this.ctx);
        this.bigPlanet.draw(this.ctx);
        this.bigPlanet.moveUp();
        this.moveStars();

        //planets
        this.ringPlanets.forEach(ring => {
            ring.draw(this.ctx);
            ring.moveDiagonalDown();
        })
        this.twinPlanet.forEach(twin => {
            twin.draw(this.ctx);
            twin.moveDiagonalUp()
        })

        //rocket
        this.ctx.drawImage(this.rocket.i, ROCKET.SX, ROCKET.SY,
            spriteWidth, spriteHeight,
            this.rocket.pos[0], this.rocket.pos[1], 100, 150)
        //enter and get to center 
        if (ROCKET.CENTER_POS[0] >=  this.rocket.pos[0] && ROCKET.CENTER_POS[1] >= this.rocket.pos[1]) {
            this.up = false; 
        }
        // console.log(this.up)
        this.switchRocketAnimation(this.up)

        requestAnimationFrame(this.animate.bind(this));
    }


    switchRocketAnimation(up) {
        //if (ROCKET.CENTER_POS[0] === this.rocket.pos[0] && ROCKET.CENTER_POS[1] === this.rocket.pos[1])
        if (up) {
            //square animation  
            this.rocket.moveIntoScreen();

        } else {
            // let font = new FontFace('Diplomata SC', )
            this.ctx.font = 'oblique 30px Verdana';
            this.ctx.fillText('WINNER!', 250, 275);
            this.ctx.font = 'oblique 15px Verdana';
            //create a temp canavs which will be use to restart the game loop 
            this.ctx.fillText('Click To Play Again', 75, 730)
            this.rocket.moveUpAndDown(this.upDown)
            this.upDown = this.upDown ? false : true;
        }
        
    }

    assignSrcs() {
        this.background.src = './assests/exosphere/layers/parallax-space-background.png'
    }

    generateRingPlanets() {
        let arr = [];
            for (let i=0; i < 5; i++) {
                arr.push(new MovingObjects({
                    pos: this.randomPos(),
                    width: this.randomSize(100, 100)[0],
                    height: this.randomSize(100, 100)[0],
                    color: 'black',
                    canvas: this.canvas,
                    src: './assests/exosphere/layers/parallax-space-ring-planet.png'
                }))
            
        }
        return arr; 
    }

    generateTwinPlanets() {
        let arr = [];
        for (let i = 0; i < 10; i++) {
            let size = this.randomSize(200, 200);
            arr.push(new MovingObjects({
                pos: this.randomPos(),
                width: size[0],
                height: size[1],
                color: 'black',
                canvas: this.canvas,
                src: './assests/exosphere/layers/parallax-space-far-planets.png'
            }))
        }
        return arr; 
    }

    moveStars() {
        // console.log(this.background.pos);
        if (this.stars.pos[0] > this.stars.width) this.stars.pos[0] = 0;
        else this.stars.pos[0] += 0.05;
    }

    randomPos() {
        let x = Math.floor(Math.random() * 500)
        let y = Math.floor(Math.random() * 750);
        return [x, y]
    }

    randomSize(w,h) {
        let newW = Math.floor(Math.random() * w)
        let newH = Math.floor(Math.random() * h);
        return [newW, newH]
    }




}