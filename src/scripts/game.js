import TypeWritingConsole from "./typewriting-console";
export default class Game {
    constructor(ctx, typeWC) {
        this.ctx = ctx
        this.x = 0;
        this.y = 0;
        this.i = new Image();
        this.typeWC = typeWC;
        this.i.src = "../../assests/stars-test.png";
      
    }

    animate() {
        console.log(this.i);
        this.ctx.save();
        this.ctx.clearRect(0,0, 10, 10);
        this.draw()
        clearInterval(this.renderBackground())
        this.renderBackground()
        this.backgroundMove();
        this.ctx.restore();
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.arc(250, 400, 50, 0, 2 * Math.PI);
        this.ctx.fill();
    }

    renderBackground() {
        let that = this;
        this.i.onload = function () {
            that.ctx.drawImage(that.i, 0, that.y, 500, 500);
            console.log(that.y);
            if (that.y >= 499) {
                that.y = 0
            }
        } 
    }
    
    backgroundMove() {
        
        setInterval(()=> {
            this.y++
            // this.liftOff++;
            this.ctx.drawImage(this.i, 0, this.y, 500, 500);
            if (this.y >= 499) {
                this.y = 0
            } 

        }, this.typeWC.adjTime)

    }
}

