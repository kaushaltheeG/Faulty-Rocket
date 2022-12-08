import Rocket from "./rocket";

const h5Div = document.getElementById('past-run-text');

export default class TypeWritingConsole {

    constructor(characterCount, time, errors, ctx, level) {
        this.characterCount = characterCount;
        this.time = time;   
        this.errors = errors; 
        this.ctx = ctx; 
        this.level = level;
        this.minutes =  parseInt(this.time.slice(0,2));
        this.seconds = parseInt(this.time.slice(3));
        this.adjTime = this.adjustTime()
        this.wpm = this.calculateWPM();
        this.wpmFactorsDiv = document.getElementById('wpm-factors')
        this.wpmFactorsDiv.innerHTML = "";
        this.printResults();
        this.rocket = new Rocket(this.wpm, this.ctx, this.level);
    }

    adjustTime() {
        let adjSec = this.seconds / 60;
        return this.minutes + adjSec;
    }
    
    calculateWPM() {
        /*
        A word is any 5+ char count 
        Gross WPM = (totalChars/5) / time(min)
        Net WPM = Gros WPM - (errors / time(min))
                = [(totalChars/5) - errors] / time(min)
        */
        let words = (this.characterCount / 5)
        let netWPM = Math.floor(Math.abs(words - this.errors) / this.adjTime)
        return netWPM;
    }

    printResults() {
        h5Div.innerHTML = '';
        h5Div.innerHTML = 'Past Run'

        this._pastTimeCal(this.time);
        this._pastCharCount(this.characterCount);
        this._pastErrorCount(this.errors);
        this._pastWPM(this.wpm);
    }
    _pastTimeCal(time) {
        if (time) {

            const span = document.createElement("span");
            span.setAttribute('class', 'wpm')
            span.innerHTML = `Time: ${time}`;
            this.wpmFactorsDiv.appendChild(span);
        }
    }

     _pastCharCount(count) {

        const span = document.createElement("span");
        span.setAttribute('class', 'wpm')
        span.innerHTML = `Char Count: ${count}`;
        this.wpmFactorsDiv.appendChild(span);
    }

     _pastErrorCount(errorCount) {

        const span = document.createElement("span");
        span.setAttribute('class', 'wpm')
        span.innerHTML = `Errors: ${errorCount}`;
         this.wpmFactorsDiv.appendChild(span);
    }

     _pastWPM(wpm) {
        const pastWPM = document.getElementById('past-wpm');
        pastWPM.innerHTML = "";

        const span = document.createElement('span');
        span.innerHTML = `Calculated WPM: ${wpm}`;
        pastWPM.appendChild(span);
    }



    
}