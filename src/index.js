import TypeWritingConsole from "./scripts/typewriting-console";
import Game from "./scripts/game";

const RANDOM_QUOTE_API_URL = "https://api.quotable.io/random?minLength=100&maxLength=450";
const quoteDisplay = document.getElementById("quoteDisplay");
const quoteInput = document.getElementById("quoteInput");
const consoleInterfaceDiv = document.getElementById("console-interface");
const canvasEl = document.getElementById("rocket-canvas");
const ctx = canvasEl.getContext("2d");
let animatation; 

canvasEl.width = 500;
canvasEl.height = 750; 
// canvasEl.style = 'border: 1px solid #000000';
// ctx.beginPath();
// ctx.rect(100, 675, 300, 75);
// ctx.stroke();
let game; 
let newGame = document.createElement('button');
newGame.innerHTML = 'New Game';
consoleInterfaceDiv.appendChild(newGame)
newGame.addEventListener('click', (e)=> {
    if (game) game.quote.timer.endTimer();
    game = new Game(ctx, 0, canvasEl);
})

let errorArr = [], errorCount = 0;
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
            if (errorCount < caughtErrors) errorCount = caughtErrors
            
        }
    })
    
    if (finished) {
        const twc = new TypeWritingConsole(game.quote.charCount, game.quote.timer.pastTime, errorCount, ctx, game.level.passingWpm)
        twc.rocket.animate(() => {
            console.log('passed');
            if (twc.rocket.passedLevel) {
                game.newLevel();
            } else {
                game.failedLevel();
            }
            console.log(game.strikes)
            game.gameOver();
        });
    }
})

function _catchErors(quoteSpan) {
    quoteSpan.forEach((span, i) => {
        if (span.className === 'rendered-quote incorrect' && !errorArr.includes(i)) errorArr.push(i);
    })
    return errorArr.length; 
}








