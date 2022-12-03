

export default class TypeWritingConsole {

    constructor(characterCount, time, errors) {
        console.log('hi from twc')
        this.characterCount = characterCount;
        this.time = time; 
        this.errors = errors; 
        this.minutes =  parseInt(this.time.slice(0,2));
        this.seconds = parseInt(this.time.slice(3));
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
        let netWPM = Math.floor(Math.abs(words - this.errors) / this.adjustTime())
        return netWPM;
    }
     _pastTimeCal(time) {
        if (time) {
            const pastTimeEle = document.getElementById('past-time')
            pastTimeEle.innerHTML = ""
            const span = document.createElement("span");
            span.innerHTML = `Past Run Time: ${time}`;
            pastTimeEle.appendChild(span);
        }
    }

     _pastCharCount(count) {
        const pastCharCount = document.getElementById('past-charCount')
        pastCharCount.innerHTML = "";
        const span = document.createElement("span");
        span.innerHTML = `Past char count: ${count}`;
        pastCharCount.appendChild(span);
    }

     _pastErrorCount(errorCount) {
        const pastErrorCountEle = document.getElementById('error-count')
        pastErrorCountEle.innerHTML = "";
        const span = document.createElement("span");
        span.innerHTML = `Past error count: ${errorCount}`;
        pastErrorCountEle.appendChild(span);
    }

     _pastWPM(wpm) {
        const pastWPM = document.getElementById('past-wpm');
        pastWPM.innerHTML = "";
        const span = document.createElement('span');
        span.innerHTML = `Past run's WPM: ${wpm}`;
        pastWPM.appendChild(span);
    }

    
}