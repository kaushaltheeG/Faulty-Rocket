

export default class TypeWritingConsole {
    constructor(characterCount, time, errors) {
        console.log('hi from twc')
        this.characterCount = characterCount;
        this.time = time; 
        this.errors = errors; 
    }
    /*  Gross WPM = (totalChars/5) / time(min)
        Net WPM = Gros WPM - (errors / time(min))
                = [(totalChars/5) - errors] / time(min)
            */
    // calculateWPM() {
    //     let grossWPM = (this.characterCount / 5)
    // }
}