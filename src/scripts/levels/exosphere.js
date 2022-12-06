import MovingObjects from "./movingObjects";



export default class Exosphere {
    constructor(ctx, canvas) {
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
        this.ringPlanets = this.generateRingPlanets();
        this.twinPlanet = this.generateTwinPlanets();
        this.bigPlanet = new MovingObjects({
            pos: [0, 300],
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
        this.ctx.drawImage(this.background, 0, 0, 500, 750);
        this.stars.draw(this.ctx);
        this.bigPlanet.draw(this.ctx);
        this.bigPlanet.moveUp();
        this.moveStars();
        this.ringPlanets.forEach(ring => {
            ring.draw(this.ctx);
            ring.moveDiagonalDown();
        })
        this.twinPlanet.forEach(twin => {
            twin.draw(this.ctx);
            twin.moveDiagonalUp()
        })
        requestAnimationFrame(this.animate.bind(this));
    }

    assignSrcs() {
        this.background.src = './assests/exosphere/layers/parallax-space-background.png'
        // this.stars.src = './assests/exosphere/layers/parallax-space-stars.png'
        // this.ringPlanet.src = './assests/exosphere/layers/parallax-space-ring-planet.png'
        // this.twinPlanet.src = './assests/exosphere/layers/parallax-space-far-planets.png'
        // this.bigPlanet.src = './assests/exosphere/layers/parallax-space-big-planet.png'
    }

    generateRingPlanets() {
        let arr = [];
        for (let i=0; i < 2; i++) {
            arr.push(new MovingObjects({
                pos: this.randomPos(),
                width: 100,
                height: 100,
                color: 'black',
                canvas: this.canvas,
                src: './assests/exosphere/layers/parallax-space-ring-planet.png'
            }))
        }
        return arr; 
    }

    generateTwinPlanets() {
        let arr = [];
        for (let i = 0; i < 3; i++) {
            arr.push(new MovingObjects({
                pos: this.randomPos(),
                width: 200,
                height: 200,
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

    randomPos(height) {
        let x = Math.floor(Math.random() * 500)
        let y = Math.floor(Math.random() * 750);
        return [x, y]
    }




}