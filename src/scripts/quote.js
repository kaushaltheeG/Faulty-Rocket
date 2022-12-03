const Timer = require("./timer");
const RANDOM_QUOTE_API_URL = "https://api.quotable.io/random?minLength=100&maxLength=450";

export default class Quote {
    constructor() {}

    async getRandomQuote() {
        try {
            const res = await fetch(RANDOM_QUOTE_API_URL);
            if (res.ok) {
                let data = await res.json();
                return data.content;
            } else {
                let data = await res.join();
                throw data.meta.msg
            }
        } catch (error) {
            console.error(error);
        }
    }

    async renderNewQuote() {
        let pastRunInstance;
        if (pastTime) {
            pastRunInstance = pastRunData(charHash[pastRunKey - 1], pastTime, errorCount)
            console.log(`past run data: charCount ${pastRunInstance.characterCount} time: ${pastRunInstance.time} errors: ${pastRunInstance.errors}`)

        }
        errorCount = 0;
        errorArr = [];
        const quote = await getRandomQuote();
        quoteDisplay.innerHTML = "";
        quoteInput.value = null;
        charCount = 0;
        quote.split('').forEach(char => {
            charCount++;
            let span = document.createElement("span");
            span.className = 'rendered-quote';
            span.innerHTML = char;
            quoteDisplay.appendChild(span);
        })
        charHash[pastRunKey] = charCount;
        pastRunKey++;
        Timer.startTimer();
    }
}