import TypeWritingConsole from "./typewriting-console";
import Quote from "./quote";
import Level from "./level";

export default class Game {
    constructor(ctx, level, canvas) {
        this.canvas = canvas
        this.ctx = ctx
        this.level = new Level(level, this.ctx); 
        this.x = 0;
        this.y = 0;
        this.quote = new Quote();
        this.strikes = 0;
        this.rocketImage = new Image();
        this.rocketImage.src = './assests/rocket_launched_test.png'
        this.animate()
        // this.start();
    }

    gameOver() {
        if (this.strikes >= 3) {
            alert('Game Over');
        } else if (this.strikes < 3 && this.level.state === 5) {
            alert('Winner!!!!')
        }
    }

    
    failedLevel() {
        console.log('in failed');
        this.strikes++; 
        this.quote.timer.endTimer();
        this.quote = new Quote();
        this.animate();

    }

    newLevel() {
        this.level.state++;
        this.quote.timer.endTimer();
        this.strikes = 0; 
        this.quote = new Quote;
        this.level.renderLevel(this.level.state)
        this.ctx.fillStyle = 'red';
        this.ctx.fillRect(225, 600, 50, 75)
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        this.ctx.drawImage(this.level.platform, 50, 400, 400, 400)
        this.ctx.drawImage(this.level.rocket, 0, 0, 135, 145, 215, 575, 100, 150);
        requestAnimationFrame(this.animate.bind(this));

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

