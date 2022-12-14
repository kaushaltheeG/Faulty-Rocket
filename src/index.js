import TypeWritingConsole from "./scripts/typewriting-console";
import Game from "./scripts/game";
import Start from "./scripts/start";


//Needed vars
const keyboard = document.querySelector(".keyboard");
const quoteDisplay = document.getElementById("quoteDisplay");
const quoteInputDiv = document.getElementById("quoteInput");
const quoteInput = document.getElementById("quote-input")
const allLetterEles = document.querySelectorAll('.letter');
const inputDisplayDiv = document.querySelector("#input-display");
const canvasEl = document.getElementById("rocket-canvas");
const ctx = canvasEl.getContext("2d");
let errorArr = [], errorCount = 0;
canvasEl.width = 500;
canvasEl.height = 750; 
let game; 


//Start and New game 
new Start(ctx, canvasEl);

canvasEl.addEventListener('click', (e)=> {
    errorArr = [], errorCount = 0;
    if (game) game.quote.timer.endTimer();
    game = new Game(ctx, 0, canvasEl);
})

//Event listners 
quoteInput.addEventListener('input', (e) => {
    const quoteSpanArr = quoteDisplay.querySelectorAll(".rendered-quote")
    const inputValArr = quoteInput.value.split('')
    let finished = true, caughtErrors = 0; 
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
            if (errorCount < caughtErrors) errorCount = caughtErrors;
        }
    })
    
    if (finished) {
        const twc = new TypeWritingConsole(game.quote.charCount, game.quote.timer.pastTime, errorCount, ctx, game.level)
        twc.rocket.animate(() => {
            errorArr = [];
            errorCount = 0; 
            if (twc.rocket.passedLevel) {
                game.newLevel();
            } else {
                game.failedLevel();
            }
        });
    }
})

function _catchErors(quoteSpan) {
    quoteSpan.forEach((span, i) => {
        if (span.className === 'rendered-quote incorrect' && !errorArr.includes(i)) errorArr.push(i);
    })
    return errorArr.length; 
}

//keyboard feature 
keyboard.addEventListener('keydown', (e) => {
    if (!e.metaKey) {
        const keyEle = e.key !== " " ? document.getElementById(`${e.key}`) : document.getElementById(`${e.code}`)
        if (e.shiftKey) _captializeAll();
        keyEle.classList.add('pressedKey')
    }
})

keyboard.addEventListener('keyup', (e) => {
    
    if (!e.metaKey) {
        const keyEle = e.key !== " " ? document.getElementById(`${e.key}`) : document.getElementById(`${e.code}`)
        keyEle.classList.remove('pressedKey')
        if (!e.shiftKey) _lowerAll();
    }
})

function _captializeAll() {
    allLetterEles.forEach((span, i) => {
        span.innerHTML = span.innerHTML.toUpperCase();
        span.classList.add('pressedKey')
    })
}

function _lowerAll() {
    allLetterEles.forEach((span, i) => {
        span.innerHTML = span.innerHTML.toLowerCase();
        span.classList.remove('pressedKey')
    })
}

//audio 
const audioButton = document.getElementById('audio-btn');
const audioEle = document.getElementById('music');
const audioSrc = document.getElementById('music-src')
const audioArr = ['disco-groove', 'lo-fi-house', 'mesmerizing', 'passion']

audioButton.addEventListener('click', (e)=> {
    
    if (audioEle.paused) {
        let rand = Math.floor(Math.random() * audioArr.length)
        audioButton.src = "./assests/sound/pause.png"
        audioSrc.src = `./assests/sound/${audioArr[rand]}.mp3`
        audioEle.load();
        audioEle.play();
    } else {
        audioButton.src = "./assests/sound/sound-wave.png"
        audioEle.pause();
    }
})














