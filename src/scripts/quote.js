import Timer from "./timer";
const RANDOM_QUOTE_API_URL = "https://api.quotable.io/random?minLength=100&maxLength=450";

export default class Quote {
    constructor() {
        // this.timer = new Timer();
        // this.errorArr = [];
        this.charCount = 0;
        this.renderNewQuote();
        this.timer = new Timer();

    }

    async getRandomQuote() {
        try {
            const res = await fetch(RANDOM_QUOTE_API_URL);
            if (res.ok) {
                let data = await res.json();
                // console.log(data.content)
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
        this.quoteInput = document.getElementById("quote-input")
        const quote = await this.getRandomQuote();
        console.log(quote)
        quoteDisplay.innerHTML = "";
        this.quoteInput.value = null;
        //charCount = 0;
        quote.split('').forEach(char => {
            this.charCount++;
            let span = document.createElement("span");
            span.className = 'rendered-quote';
            span.innerHTML = char;
            quoteDisplay.appendChild(span);
        })
        // charHash[pastRunKey] = charCount;
        // pastRunKey++;
        // console.log(timer);
        
        this.timer.startTimer();
    }
}