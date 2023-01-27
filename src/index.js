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
let isEnabled = false; 


//Start and New game 
new Start(ctx, canvasEl);
if (!isEnabled) {
    quoteInput.disabled = true; 
} else {
    quoteInput.disabled = false; 
}

canvasEl.addEventListener('click', (e)=> {
    errorArr = [], errorCount = 0;
    if (game) game.quote.timer.endTimer();
    game = new Game(ctx, 0, canvasEl);
    isEnabled = true; 
    quoteInput.disabled = false; 
    quoteInput.focus();
    
})

//diable enter and capslock key stroke within quoteInput 
quoteInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        return false 
    }
})

//Event listners 
quoteInput.addEventListener('input', (e) => {
  //retrived the quote dipalye inner spans
  const quoteSpanArr = quoteDisplay.querySelectorAll(".rendered-quote");
  //retrived the user input value
  const inputValArr = quoteInput.value.split("");
  
  //error count 
  let caughtErrors = 0; 
  //user input and quote lenght to determine if user finished 
  let userInputCount = inputValArr.length,
    quoteCharCount = quoteSpanArr.length;

  // checks wheater or not to append the correct or incorrect class
  quoteSpanArr.forEach((charSpan, i) => {
    const inputChar = inputValArr[i];
    if (inputChar == null) {
      charSpan.classList.remove("correct");
      charSpan.classList.remove("incorrect");
    
    } else if (inputChar === charSpan.innerHTML) {
      charSpan.classList.add("correct");
      charSpan.classList.remove("incorrect");
 
    } else {
      charSpan.classList.remove("correct");
      charSpan.classList.add("incorrect");
   
      caughtErrors = _catchErors(quoteSpanArr);
      if (errorCount < caughtErrors) errorCount = caughtErrors;
    }
  });

  
  if (userInputCount === quoteCharCount) {
    //uncorrected errors ~ is more forgiving error detection  
            //errorCount ~ less forgiving count caches the error; does not care if error is fixed or not
    let uncorrectedCount = 0;
    quoteSpanArr.forEach((charSpan) => {if (charSpan.classList.contains("incorrect")) uncorrectedCount++;}); // 
    

    const twc = new TypeWritingConsole(
      game.quote.charCount,
      game.quote.timer.pastTime,
      uncorrectedCount,
      ctx,
      game.level
    );
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

//for shift, chars, and space bar 
keyboard.addEventListener('keydown', (e) => {
   
    if (!e.metaKey) {
        const keyEle = e.key !== " " ? document.getElementById(`${e.key}`) : document.getElementById(`${e.code}`)
        if (e.shiftKey) _captializeAll(); 
       
        if (keyEle && !keyEle.classList.contains('pressedKey')) keyEle.classList.add('pressedKey'); 
    }
})

keyboard.addEventListener('keyup', (e) => {
    
    if (!e.metaKey) {
        const keyEle = e.key !== " " ? document.getElementById(`${e.key}`) : document.getElementById(`${e.code}`)
        if (!e.shiftKey) _lowerAll();
        if (keyEle && keyEle.classList.contains("pressedKey"))
          keyEle.classList.remove("pressedKey");
    }
})

//capsLock detection 
keyboard.addEventListener('keydown', _capsLockDetection);
keyboard.addEventListener('keyup', _capsLockDetection)

//capsLock detection helper function 
function _capsLockDetection(e) {
   
    if (e.code === "CapsLock") {
        let isCap = e.getModifierState("CapsLock"); 
        if (isCap) {
            return _captializeAll()
        } else {
            return _lowerAll()
        }
    }
}

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














