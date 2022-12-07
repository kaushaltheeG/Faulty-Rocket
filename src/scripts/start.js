import MovingObjects from "./levels/movingObjects";


const spriteWidth = 135;
const spriteHeight = 145;
export default class Start {
    constructor(ctx, canvas) {
        this.ctx = ctx;
        this.canvas = canvas;
        this.background = new Image();
        this.background.src = './assests/start_screen/nebula_aqua_pink.png'
        this.stars = this.starImageArr();
        this.rocketImg();
        this.instructions = this.instructionsHash();
        this.sliceIdx = 1; 
        this.posY = 50;
        this.renderInstructions();
        
    }

    renderInstructions() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        this.ctx.drawImage(this.background, 0, 0, 500, 750);
        this.ctx.drawImage(this.starStatic, 0, 0, 500, 750);
        this.stars.forEach(star => {
            star.draw(this.ctx);
            star.movePurelyDowm();
        })
        //Display test 
        this.ctx.font = "24px Rockwell";
        this.ctx.fillStyle = 'white'

        if (this.sen1) this.ctx.fillText(this.sen1, 0, 50, this.canvas.width)
        if (this.sen2) this.ctx.fillText(this.sen2, 0, 80, this.canvas.width)
        if (this.sen3) this.ctx.fillText(this.sen3, 0, 120, this.canvas.width)
        if (this.sen4) this.ctx.fillText(this.sen4, 0, 150, this.canvas.width)
        if (this.sen5) this.ctx.fillText(this.sen5, 0, 180, this.canvas.width)
        if (this.sen6) this.ctx.fillText(this.sen6, 0, 210, this.canvas.width)
        if (this.sen7) this.ctx.fillText(this.sen7, 0, 240, this.canvas.width)
        if (this.sen8) this.ctx.fillText(this.sen8, 0, 270, this.canvas.width)

        if (this.currentKey < 9) this.ctx.fillText(this.currentIns, 0, this.posY, this.canvas.width); //(this.canvas.width / 2) - this.ctx.measureText(this.currentIns).width / 2,
        if (this.currentKey < 9) {
            this.spliceAndAdd(this.sliceIdx);
        } else {
            this.ctx.drawImage(this.rocket.i, this.sx, this.sy,
                spriteWidth, spriteHeight,
                this.rocket.pos[0], this.rocket.pos[1], 100, 150)
            this.rocket.moveUpAndDown(this.up);
            this.ctx.fillText('Click to Start', 175, 575)
            this.up = this.up ? false : true;
        }
        requestAnimationFrame(this.renderInstructions.bind(this));
    }

    spliceAndAdd(idx) {
        this.currentIns = this.instructions[this.currentKey].slice(0, idx) 
        if (this.currentKey < 9 && idx !== this.instructions[this.currentKey].length) this.currentIns += '_'
        if (idx === this.instructions[this.currentKey].length) {
            this.assignSen(this.currentKey, this.currentIns)
            this.sliceIdx = 1;
            this.currentKey += 1
            this.posY += 30
        } else {
            this.sliceIdx++
            
        }
        
    }

    assignSen(key, currSen) {
        if (key === 1) {
            this.sen1 = currSen
        } else if (key === 2) {
            this.sen2 = currSen
        } else if (key === 3) {
            this.sen3 = currSen
        } else if (key === 4) {
            this.sen4 = currSen
        } else if (key === 5) {
            this.sen5 = currSen
        } else if (key == 6) {
            this.sen6 = currSen
        } else if (key == 7) {
            this.sen7 = currSen
        } else if (key == 8) {
            this.sen8 = currSen
        }
    }

    
    instructionsHash() {
        this.sen1 = '';
        this.sen2 = '';
        this.sen3 = '';
        this.sen4 = '';
        this.sen5 = '';
        this.sen6 = '';
        this.sen7 = '';
        this.sen8 = '';
        this.currentKey = 1;
        return {
            1: "An ecofriendly resource has been discovered",
            2: "It is be used by this rocket.", 
            3: "However, the rocket is very ... faulty.",
            4: "The rocket must be charged at each atmosphere level.",
            5: "To get to the next level, ",
            6: "CORRECTLY COMPLETE each quote at a certain WPM.",
            7: "You have 3 tries at each level.",
            8: "Get this FAULTY ROCKET to SPACE!"
        }
    }

    starImageArr() {
        this.starStatic = new Image();
        this.starStatic.src = './assests/start_screen/stars3.png'
        let arr = [], x = 0, y = 0;
        for (let i=1; i<5; i++) {
            console.log(y)
            arr.push(new MovingObjects({
                pos: [0, y],
                width: this.canvas.width,
                height: this.canvas.height,
                color: 'black',
                canvas: this.canvas,
                src: `./assests/start_screen/stars${i}.png`
            }));
             y = y - 700;
            //  console.log(y)
        }
        console.log(arr)
        return arr; 
    }

    rocketImg() {
        this.up = true; 
        this.rocket = new MovingObjects({
            pos: [200, 400],
            width: spriteWidth,
            height: 145,
            color: 'black',
            canvas: this.canvas,
            src: "./assests/rocket_spriteSheet_final.png"
        })
        this.sx = 145;
        this.sy = 0; 
    }
}