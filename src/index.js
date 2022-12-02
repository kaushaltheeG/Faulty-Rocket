const RANDOM_QUOTE_API_URL = "https://api.quotable.io/random?minLength=100&maxLength=450";
const quoteDisplay = document.getElementById("quoteDisplay");
const quoteInput = document.getElementById("quoteInput");
const timer = document.getElementById("timer");

async function getRandomQuote() {
    try {
        const res = await fetch(RANDOM_QUOTE_API_URL);
        if (res.ok) {
            let data = await res.json();
            return data.content;
        } else {
            let data = await res.join();
            throw data.meta.msg
        }
    } catch(error) {
        console.error(error);
    }
}
// window.getRandomQuote = getRandomQuote;

async function renderNewQuote() {
    const quote = await getRandomQuote();
    quoteDisplay.innerHTML = "";
    quoteInput.value = null;
    quote.split('').forEach(char => {
        let span = document.createElement("span");
        span.className = 'rendered-quote';
        span.innerHTML = char;
        quoteDisplay.appendChild(span);
    })
    startTimer();
    
}

//to check if your input matches the rendered quote
quoteInput.addEventListener('input', (e) => {
    const quoteSpanArr = quoteDisplay.querySelectorAll(".rendered-quote")
    const inputValArr = quoteInput.value.split('')
    let finished = true; 
    quoteSpanArr.forEach((charSpan, i) => {
        const inputChar = inputValArr[i];
        if (inputChar == null) {
            charSpan.classList.remove('correct');
            charSpan.classList.remove('incorrect');
            finished = false; 
        } else if (inputChar === charSpan.innerHTML) {
            charSpan.classList.add('correct');
            charSpan.classList.remove('incorrect')
            finished = true; 
        } else {
            charSpan.classList.remove('correct');
            charSpan.classList.add('incorrect');
            finished = false; 
        }
    })

    if (finished) renderNewQuote();
})

//timer 
let startTime;
function startTimer() {
    timer.innerHTML = `00:00`;
    startTime = new Date();
    setInterval(() => {
        let currentTime = getTime();
        timer.innerHTML = renderTimeAsClock(currentTime);
    }, 1000);
}

function getTime() {
    return Math.floor((new Date() - startTime) / 1000)
}

function renderTimeAsClock(time) {
    if (time < 60) {
        if (time < 10) return `00:0${time}`;
        return `00:${time}`;
    } else {
        let min = Math.floor(time / 60);
        let seconds = time % 60;
        if (min < 10 && seconds < 10) {
            return `0${min}:0${seconds}`
        } else if (min < 10 && seconds >= 10) {
            return `0${min}:${seconds}`
        } else if (min >= 10 && seconds < 10) {
            return `${min}:0${seconds}`
        } else {
            return `${min}:${seconds}`
        }
    }
}
renderNewQuote();



