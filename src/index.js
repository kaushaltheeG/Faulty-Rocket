import TypeWritingConsole from "./scripts/typewriting-console";


const RANDOM_QUOTE_API_URL = "https://api.quotable.io/random?minLength=100&maxLength=450";
const quoteDisplay = document.getElementById("quoteDisplay");
const quoteInput = document.getElementById("quoteInput");
const timer = document.getElementById("timer");
const pastTimeEle = document.getElementById('past-time')
const pastCharCount = document.getElementById('past-charCount')
const pastErrorCountEle = document.getElementById('error-count')
const pastWPM = document.getElementById('past-wpm');


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

let charCount; 
let charHash = {}, errorArr = [];
let pastRunKey = 1;
let errorCount, startTime, pastTime;

async function renderNewQuote() {
    let pastRunInstance;
    if (pastTime) {
        pastRunInstance = pastRunData(charHash[pastRunKey - 1], pastTime, errorCount)
        console.log(`past run data: charCount ${pastRunInstance.characterCount} time: ${pastRunInstance.time} errors: ${pastRunInstance.errors}`)

    }
    errorCount = 0;
    errorArr = []
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
    startTimer();
    
}

//to check if your input matches the rendered quote

quoteInput.addEventListener('input', (e) => {
    const quoteSpanArr = quoteDisplay.querySelectorAll(".rendered-quote")
    const inputValArr = quoteInput.value.split('')
    let finished = true, caughtErrors; 
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
            caughtErrors = _catchErors(quoteSpanArr);
            if (errorCount < caughtErrors) errorCount = caughtErrors
             
        }
    })
    console.log('error arr: ' + errorArr)
    
    if (finished) renderNewQuote();
})

function _catchErors(quoteSpan) {
    quoteSpan.forEach((span, i) => {
        if (span.className === 'rendered-quote incorrect' && !errorArr.includes(i)) errorArr.push(i);
    })
    return errorArr.length; 
}

//timer 
function startTimer() {
    console.log(charHash, pastTime, errorCount)
    
    timer.innerHTML = `00:00`;
    startTime = new Date();
    setInterval(() => {
        let currentTime = getTime();
        timer.innerHTML = renderTimeAsClock(currentTime);
        pastTime = timer.innerHTML;
    }, 1000);
    // let pastRunInstance = pastRunData(charCount, pastTime, errorCount)
    // console.log(pastRunInstance)
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

/* Calculating the Net wpm: 
    time: pastTime,
    errors: , 
    quote character count: 

    

*/
function pastRunData(character, time, errors) {
    const pastRun = new TypeWritingConsole(character, time, errors);
    console.log(pastRun)
    _pastCharCount(pastRun.characterCount);
    _pastTimeCal(pastRun.time)
    _pastErrorCount(pastRun.errors)
    let wpm = pastRun.calculateWPM();
    _pastWPM(wpm);
    return pastRun;
}
function _pastTimeCal(time) {
    if (time) {
        pastTimeEle.innerHTML = ""
        const span = document.createElement("span");
        span.innerHTML = `Past Run Time: ${time}`;
        pastTimeEle.appendChild(span);
    }
}

function _pastCharCount(count) {
    pastCharCount.innerHTML = "";
    const span = document.createElement("span");
    span.innerHTML = `Past char count: ${count}`;
    pastCharCount.appendChild(span);
}

function _pastErrorCount(errorCount) {
    pastErrorCountEle.innerHTML = "";
    const span = document.createElement("span");
    span.innerHTML = `Past error count: ${errorCount}`;
    pastErrorCountEle.appendChild(span);
}

function _pastWPM(wpm) {
    pastWPM.innerHTML = "";
    const span = document.createElement('span');
    span.innerHTML = `Past run's WPM: ${wpm}`;
    pastWPM.appendChild(span);
}





renderNewQuote();



