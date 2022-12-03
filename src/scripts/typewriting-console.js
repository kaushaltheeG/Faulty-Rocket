

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
}