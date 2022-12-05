


export default class Exosphere {
    constructor(ctx, canvas) {
        this.ctx = ctx;
        this.canvas = canvas;
        this.background = new Image();
        this.stars = new Image();
        this.ringPlanet = new Image();
        this.twinPlanet = new Image();
        this.bigPlanet = new Image();
        this.assignSrcs();
        this.animate();
    }

    animate() {
        //have the the plants(each with a different speed) enter and exit frame 
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        this.ctx.drawImage(this.background, 0, 0, 500, 750);
        this.ctx.drawImage(this.stars, 0, 0, 500, 750);
        requestAnimationFrame(this.animate.bind(this));
    }

    assignSrcs() {
        this.background.src = './assests/exosphere/layers/parallax-space-background.png'
        this.stars.src = './assests/exosphere/layers/parallax-space-stars.png'
        this.ringPlanet.src = './assests/exosphere/layers/parallax-space-ring-planet.png'
        this.twinPlanet.src = './assests/exosphere/layers/parallax-space-far-planets.png'
        this.bigPlanet.src = './assests/exosphere/layers/parallax-space-big-planet.png'
    }

    


}