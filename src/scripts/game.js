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
        // this.quote = new Quote();
        this.rocketImage = new Image();
        // this.typeWC = typeWC;
        this.rocketImage.src = './assests/rocket_launched_test.png'
        // this.rocketImage.onload 
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
        // console.log(this.i);
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        this.ctx.save();
        this.canvas.style = 'border: 1px solid #000000';
        this.ctx.beginPath();
        this.ctx.rect(100, 675, 300, 75);
        this.ctx.fillStyle = 'grey'             
        this.ctx.stroke();
        console.log(this.rocketImage);
        // this.ctx.drawImage(this.rocketImage, 200, 600)
        this.ctx.fillStyle = 'red';
        // // console.log(this.pos);
        this.ctx.fillRect(225, 600, 50, 75)
        this.ctx.clearRect(0,0, 10, 10);
        // this.draw()
        // clearInterval(this.renderBackground())
        // this.renderBackground()
        // this.backgroundMove();
        this.ctx.restore();
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

