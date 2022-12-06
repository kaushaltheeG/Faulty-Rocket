import Troposphere from "./levels/troposphere";
import Stratosphere from "./levels/stratosphere";
import Mesosphere from "./levels/mesosphere";
import Thermosphere from "./levels/thermosphere";
import Exosphere from "./levels/exosphere";
import Base from "./levels/base";

export default class Level {
    constructor(state, ctx) {
        this.state = state;
        this.ctx = ctx;
        this.passingWpm; 
        this.renderLevel(this.state);
        // this.platform.src = './assests/launch-final.png'
    }

    renderLevel(state) {
        // console.log('in level')
        // ground:0, troposphere:1, stratosphere:2, mesosphere:3, thermosphere:4 and exosphere:5 goal(will be rendered to show user has won)
        this.canvas = document.getElementById("rocket-canvas")
        this.canvas.className = ""
        this.rocket = new Image();
        this.rocket.src = './assests/rocket_spriteSheet_final.png';
        this.platform = new Image();
        this.platform.src = './assests/launch-final.png'
        switch(state) {
            case 0: //base
                // this.canvas.className = 'level-zero'
                this.base = new Base(this.ctx, this.canvas, this.rocket, this.platform)
                this.passingWpm = 20;
                break;
            case 1: //troposphere
                // canvas.className = 'level-one'
                this.tropo = new Troposphere(this.ctx, this.canvas, this.rocket, this.platform);
                this.passingWpm = 35;
                break;
            case 2: //stratosphere
                // canvas.className = 'level-two'
                this.strato = new Stratosphere(this.ctx, this.canvas, this.rocket, this.platform);
                this.passingWpm = 50; 
                break;
            case 3: //Mesosphere
                // canvas.className = 'level-three'
                this.meso = new Mesosphere(this.ctx, this.canvas, this.rocket, this.platform)
                this.passingWpm = 75; 
                break;
            case 4: //Thermosphere
                // canvas.className = 'level-four'
                this.thermo = new Thermosphere(this.ctx, this.canvas, this.rocket, this.platform);
                this.passingWpm = 100; 
                break;
            case 5: //Exosphere
                // canvas.className = 'level-five'
                this.exo = new Exosphere(this.ctx, this.canvas, this.rocket);
                break;
        }
        
    }



    //test 
    animate() {
        this.ctx.clearRect(0,0, this.canvas.width, this.canvas.height)
        this.ctx.drawImage(this.tropoBackground, 0, 0);
        requestAnimationFrame(this.animate.bind(this));
    }
    
    
    troposphere() {
        this.tropoBackground = new Image();
        this.tropoBackground.src = './assests/troposphere/tropoBackground.png'
        console.log(this.tropoBackground)
        this.animate();
    }




}