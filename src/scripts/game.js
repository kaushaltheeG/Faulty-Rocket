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
        this.animate()
    }

    gameOver() {
        if (this.strikes >= 3) {
            alert('Game Over');
        } else if (this.strikes < 3 && this.level.state === 5) {
            alert('Winner!!!!')
        }
    }

    
    failedLevel() {
        this.strikes++; 
        
        this.quote.timer.endTimer();
        this.quote = new Quote();
        this.animate();
        // this.level.renderLevel(this.level.state)
    }

    newLevel() {
        this.level.state++;
        this.quote.timer.endTimer();
        this.strikes = 0; 
        this.quote = new Quote;
        this.animate();
        // this.level.renderLevel(this.level.state)
    }

    animate() {
        this.level.renderLevel(this.level.state, this.strikes)
    }



}

