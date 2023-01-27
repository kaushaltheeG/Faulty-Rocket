import Timer from "./timer";
const RANDOM_QUOTE_API_URL = "https://api.quotable.io/random?minLength=100&maxLength=250";

export default class Quote {
    constructor() {
       
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
            console.error('refresh to get new quote!!!')
        }
    }

    async renderNewQuote() {
        this.quoteInput = document.getElementById("quote-input")
        const quote = await this.getRandomQuote();
       this.fetchedQuote = quote; 
        quoteDisplay.innerHTML = "";
        this.quoteInput.value = null;
        
        quote.split('').forEach(char => {
            this.charCount++;
            let span = document.createElement("span");
            span.className = 'rendered-quote';
            span.innerHTML = char;
            quoteDisplay.appendChild(span);
        })
        
        this.timer.startTimer();
    }
}