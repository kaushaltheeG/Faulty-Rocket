/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _scripts_typewriting_console__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./scripts/typewriting-console */ \"./src/scripts/typewriting-console.js\");\n\nconst RANDOM_QUOTE_API_URL = \"https://api.quotable.io/random?minLength=100&maxLength=450\";\nconst quoteDisplay = document.getElementById(\"quoteDisplay\");\nconst quoteInput = document.getElementById(\"quoteInput\");\nconst timer = document.getElementById(\"timer\");\nconst canvasEl = document.getElementById('rocket-canvas');\nconst ctx = canvasEl.getContext(\"2d\");\ncanvasEl.width = 1000;\ncanvasEl.height = 1000;\nasync function getRandomQuote() {\n  try {\n    const res = await fetch(RANDOM_QUOTE_API_URL);\n    if (res.ok) {\n      let data = await res.json();\n      return data.content;\n    } else {\n      let data = await res.join();\n      throw data.meta.msg;\n    }\n  } catch (error) {\n    console.error(error);\n  }\n}\n// window.getRandomQuote = getRandomQuote;\n\nlet charCount;\nlet charHash = {},\n  errorArr = [];\nlet pastRunKey = 1;\nlet errorCount, startTime, pastTime;\nasync function renderNewQuote() {\n  let pastRunInstance;\n  if (pastTime) {\n    pastRunInstance = pastRunData(charHash[pastRunKey - 1], pastTime, errorCount);\n    console.log(`past run data: charCount ${pastRunInstance.characterCount} time: ${pastRunInstance.time} errors: ${pastRunInstance.errors}`);\n  }\n  errorCount = 0;\n  errorArr = [];\n  const quote = await getRandomQuote();\n  quoteDisplay.innerHTML = \"\";\n  quoteInput.value = null;\n  charCount = 0;\n  quote.split('').forEach(char => {\n    charCount++;\n    let span = document.createElement(\"span\");\n    span.className = 'rendered-quote';\n    span.innerHTML = char;\n    quoteDisplay.appendChild(span);\n  });\n  charHash[pastRunKey] = charCount;\n  pastRunKey++;\n  startTimer();\n}\n\n//to check if your input matches the rendered quote\nquoteInput.addEventListener('input', e => {\n  const quoteSpanArr = quoteDisplay.querySelectorAll(\".rendered-quote\");\n  const inputValArr = quoteInput.value.split('');\n  let finished = true,\n    caughtErrors;\n  quoteSpanArr.forEach((charSpan, i) => {\n    const inputChar = inputValArr[i];\n    if (inputChar == null) {\n      charSpan.classList.remove('correct');\n      charSpan.classList.remove('incorrect');\n      finished = false;\n    } else if (inputChar === charSpan.innerHTML) {\n      charSpan.classList.add('correct');\n      charSpan.classList.remove('incorrect');\n      finished = true;\n    } else {\n      charSpan.classList.remove('correct');\n      charSpan.classList.add('incorrect');\n      finished = false;\n      caughtErrors = _catchErors(quoteSpanArr);\n      if (errorCount < caughtErrors) errorCount = caughtErrors;\n    }\n  });\n  console.log('error arr: ' + errorArr);\n  if (finished) renderNewQuote();\n});\nfunction _catchErors(quoteSpan) {\n  quoteSpan.forEach((span, i) => {\n    if (span.className === 'rendered-quote incorrect' && !errorArr.includes(i)) errorArr.push(i);\n  });\n  return errorArr.length;\n}\n\n//timer \nfunction startTimer() {\n  // console.log(charHash, pastTime, errorCount)\n\n  timer.innerHTML = `00:00`;\n  startTime = new Date();\n  setInterval(() => {\n    let currentTime = getTime();\n    timer.innerHTML = renderTimeAsClock(currentTime);\n    pastTime = timer.innerHTML;\n  }, 1000);\n  // let pastRunInstance = pastRunData(charCount, pastTime, errorCount)\n  // console.log(pastRunInstance)\n}\n\nfunction getTime() {\n  return Math.floor((new Date() - startTime) / 1000);\n}\nfunction renderTimeAsClock(time) {\n  if (time < 60) {\n    if (time < 10) return `00:0${time}`;\n    return `00:${time}`;\n  } else {\n    let min = Math.floor(time / 60);\n    let seconds = time % 60;\n    if (min < 10 && seconds < 10) {\n      return `0${min}:0${seconds}`;\n    } else if (min < 10 && seconds >= 10) {\n      return `0${min}:${seconds}`;\n    } else if (min >= 10 && seconds < 10) {\n      return `${min}:0${seconds}`;\n    } else {\n      return `${min}:${seconds}`;\n    }\n  }\n}\nfunction pastRunData(character, time, errors) {\n  const pastRun = new _scripts_typewriting_console__WEBPACK_IMPORTED_MODULE_0__[\"default\"](character, time, errors);\n  let wpm = pastRun.calculateWPM();\n  console.log(pastRun);\n  pastRun._pastCharCount(pastRun.characterCount);\n  pastRun._pastTimeCal(pastRun.time);\n  pastRun._pastErrorCount(pastRun.errors);\n  pastRun._pastWPM(wpm);\n  return pastRun;\n}\nrenderNewQuote();//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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eS1Sb2NrZXQvLi9zcmMvaW5kZXguanM/YjYzNSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgVHlwZVdyaXRpbmdDb25zb2xlIGZyb20gXCIuL3NjcmlwdHMvdHlwZXdyaXRpbmctY29uc29sZVwiO1xuXG5cbmNvbnN0IFJBTkRPTV9RVU9URV9BUElfVVJMID0gXCJodHRwczovL2FwaS5xdW90YWJsZS5pby9yYW5kb20/bWluTGVuZ3RoPTEwMCZtYXhMZW5ndGg9NDUwXCI7XG5jb25zdCBxdW90ZURpc3BsYXkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInF1b3RlRGlzcGxheVwiKTtcbmNvbnN0IHF1b3RlSW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInF1b3RlSW5wdXRcIik7XG5jb25zdCB0aW1lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGltZXJcIik7XG5jb25zdCBjYW52YXNFbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyb2NrZXQtY2FudmFzJylcbmNvbnN0IGN0eCA9IGNhbnZhc0VsLmdldENvbnRleHQoXCIyZFwiKTtcblxuY2FudmFzRWwud2lkdGggPSAxMDAwO1xuY2FudmFzRWwuaGVpZ2h0ID0gMTAwMDsgXG5cblxuXG5hc3luYyBmdW5jdGlvbiBnZXRSYW5kb21RdW90ZSgpIHtcbiAgICB0cnkge1xuICAgICAgICBjb25zdCByZXMgPSBhd2FpdCBmZXRjaChSQU5ET01fUVVPVEVfQVBJX1VSTCk7XG4gICAgICAgIGlmIChyZXMub2spIHtcbiAgICAgICAgICAgIGxldCBkYXRhID0gYXdhaXQgcmVzLmpzb24oKTtcbiAgICAgICAgICAgIHJldHVybiBkYXRhLmNvbnRlbnQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsZXQgZGF0YSA9IGF3YWl0IHJlcy5qb2luKCk7XG4gICAgICAgICAgICB0aHJvdyBkYXRhLm1ldGEubXNnXG4gICAgICAgIH1cbiAgICB9IGNhdGNoKGVycm9yKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuICAgIH1cbn1cbi8vIHdpbmRvdy5nZXRSYW5kb21RdW90ZSA9IGdldFJhbmRvbVF1b3RlO1xuXG5sZXQgY2hhckNvdW50OyBcbmxldCBjaGFySGFzaCA9IHt9LCBlcnJvckFyciA9IFtdO1xubGV0IHBhc3RSdW5LZXkgPSAxO1xubGV0IGVycm9yQ291bnQsIHN0YXJ0VGltZSwgcGFzdFRpbWU7XG5cbmFzeW5jIGZ1bmN0aW9uIHJlbmRlck5ld1F1b3RlKCkge1xuICAgIGxldCBwYXN0UnVuSW5zdGFuY2U7XG4gICAgaWYgKHBhc3RUaW1lKSB7XG4gICAgICAgIHBhc3RSdW5JbnN0YW5jZSA9IHBhc3RSdW5EYXRhKGNoYXJIYXNoW3Bhc3RSdW5LZXkgLSAxXSwgcGFzdFRpbWUsIGVycm9yQ291bnQpXG4gICAgICAgIGNvbnNvbGUubG9nKGBwYXN0IHJ1biBkYXRhOiBjaGFyQ291bnQgJHtwYXN0UnVuSW5zdGFuY2UuY2hhcmFjdGVyQ291bnR9IHRpbWU6ICR7cGFzdFJ1bkluc3RhbmNlLnRpbWV9IGVycm9yczogJHtwYXN0UnVuSW5zdGFuY2UuZXJyb3JzfWApXG5cbiAgICB9XG4gICAgZXJyb3JDb3VudCA9IDA7XG4gICAgZXJyb3JBcnIgPSBbXVxuICAgIGNvbnN0IHF1b3RlID0gYXdhaXQgZ2V0UmFuZG9tUXVvdGUoKTtcbiAgICBxdW90ZURpc3BsYXkuaW5uZXJIVE1MID0gXCJcIjtcbiAgICBxdW90ZUlucHV0LnZhbHVlID0gbnVsbDtcbiAgICBjaGFyQ291bnQgPSAwO1xuICAgIHF1b3RlLnNwbGl0KCcnKS5mb3JFYWNoKGNoYXIgPT4ge1xuICAgICAgICBjaGFyQ291bnQrKzsgXG4gICAgICAgIGxldCBzcGFuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XG4gICAgICAgIHNwYW4uY2xhc3NOYW1lID0gJ3JlbmRlcmVkLXF1b3RlJztcbiAgICAgICAgc3Bhbi5pbm5lckhUTUwgPSBjaGFyO1xuICAgICAgICBxdW90ZURpc3BsYXkuYXBwZW5kQ2hpbGQoc3Bhbik7XG4gICAgfSlcbiAgICBjaGFySGFzaFtwYXN0UnVuS2V5XSA9IGNoYXJDb3VudDtcbiAgICBwYXN0UnVuS2V5Kys7IFxuICAgIHN0YXJ0VGltZXIoKTtcbn1cblxuLy90byBjaGVjayBpZiB5b3VyIGlucHV0IG1hdGNoZXMgdGhlIHJlbmRlcmVkIHF1b3RlXG5xdW90ZUlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgKGUpID0+IHtcbiAgICBjb25zdCBxdW90ZVNwYW5BcnIgPSBxdW90ZURpc3BsYXkucXVlcnlTZWxlY3RvckFsbChcIi5yZW5kZXJlZC1xdW90ZVwiKVxuICAgIGNvbnN0IGlucHV0VmFsQXJyID0gcXVvdGVJbnB1dC52YWx1ZS5zcGxpdCgnJylcbiAgICBsZXQgZmluaXNoZWQgPSB0cnVlLCBjYXVnaHRFcnJvcnM7IFxuICAgIHF1b3RlU3BhbkFyci5mb3JFYWNoKChjaGFyU3BhbiwgaSkgPT4ge1xuICAgICAgICBjb25zdCBpbnB1dENoYXIgPSBpbnB1dFZhbEFycltpXTtcbiAgICAgICAgaWYgKGlucHV0Q2hhciA9PSBudWxsKSB7XG4gICAgICAgICAgICBjaGFyU3Bhbi5jbGFzc0xpc3QucmVtb3ZlKCdjb3JyZWN0Jyk7XG4gICAgICAgICAgICBjaGFyU3Bhbi5jbGFzc0xpc3QucmVtb3ZlKCdpbmNvcnJlY3QnKTtcbiAgICAgICAgICAgIGZpbmlzaGVkID0gZmFsc2U7IFxuICAgICAgICB9IGVsc2UgaWYgKGlucHV0Q2hhciA9PT0gY2hhclNwYW4uaW5uZXJIVE1MKSB7XG4gICAgICAgICAgICBjaGFyU3Bhbi5jbGFzc0xpc3QuYWRkKCdjb3JyZWN0Jyk7XG4gICAgICAgICAgICBjaGFyU3Bhbi5jbGFzc0xpc3QucmVtb3ZlKCdpbmNvcnJlY3QnKVxuICAgICAgICAgICAgZmluaXNoZWQgPSB0cnVlOyBcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNoYXJTcGFuLmNsYXNzTGlzdC5yZW1vdmUoJ2NvcnJlY3QnKTtcbiAgICAgICAgICAgIGNoYXJTcGFuLmNsYXNzTGlzdC5hZGQoJ2luY29ycmVjdCcpO1xuICAgICAgICAgICAgZmluaXNoZWQgPSBmYWxzZTsgXG4gICAgICAgICAgICBjYXVnaHRFcnJvcnMgPSBfY2F0Y2hFcm9ycyhxdW90ZVNwYW5BcnIpO1xuICAgICAgICAgICAgaWYgKGVycm9yQ291bnQgPCBjYXVnaHRFcnJvcnMpIGVycm9yQ291bnQgPSBjYXVnaHRFcnJvcnNcbiAgICAgICAgICAgICBcbiAgICAgICAgfVxuICAgIH0pXG4gICAgY29uc29sZS5sb2coJ2Vycm9yIGFycjogJyArIGVycm9yQXJyKVxuICAgIFxuICAgIGlmIChmaW5pc2hlZCkgcmVuZGVyTmV3UXVvdGUoKTtcbn0pXG5cbmZ1bmN0aW9uIF9jYXRjaEVyb3JzKHF1b3RlU3Bhbikge1xuICAgIHF1b3RlU3Bhbi5mb3JFYWNoKChzcGFuLCBpKSA9PiB7XG4gICAgICAgIGlmIChzcGFuLmNsYXNzTmFtZSA9PT0gJ3JlbmRlcmVkLXF1b3RlIGluY29ycmVjdCcgJiYgIWVycm9yQXJyLmluY2x1ZGVzKGkpKSBlcnJvckFyci5wdXNoKGkpO1xuICAgIH0pXG4gICAgcmV0dXJuIGVycm9yQXJyLmxlbmd0aDsgXG59XG5cbi8vdGltZXIgXG5mdW5jdGlvbiBzdGFydFRpbWVyKCkge1xuICAgIC8vIGNvbnNvbGUubG9nKGNoYXJIYXNoLCBwYXN0VGltZSwgZXJyb3JDb3VudClcbiAgICBcbiAgICB0aW1lci5pbm5lckhUTUwgPSBgMDA6MDBgO1xuICAgIHN0YXJ0VGltZSA9IG5ldyBEYXRlKCk7XG4gICAgc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgICBsZXQgY3VycmVudFRpbWUgPSBnZXRUaW1lKCk7XG4gICAgICAgIHRpbWVyLmlubmVySFRNTCA9IHJlbmRlclRpbWVBc0Nsb2NrKGN1cnJlbnRUaW1lKTtcbiAgICAgICAgcGFzdFRpbWUgPSB0aW1lci5pbm5lckhUTUw7XG4gICAgfSwgMTAwMCk7XG4gICAgLy8gbGV0IHBhc3RSdW5JbnN0YW5jZSA9IHBhc3RSdW5EYXRhKGNoYXJDb3VudCwgcGFzdFRpbWUsIGVycm9yQ291bnQpXG4gICAgLy8gY29uc29sZS5sb2cocGFzdFJ1bkluc3RhbmNlKVxufVxuXG5mdW5jdGlvbiBnZXRUaW1lKCkge1xuICAgIHJldHVybiBNYXRoLmZsb29yKChuZXcgRGF0ZSgpIC0gc3RhcnRUaW1lKSAvIDEwMDApXG59XG5cbmZ1bmN0aW9uIHJlbmRlclRpbWVBc0Nsb2NrKHRpbWUpIHtcbiAgICBpZiAodGltZSA8IDYwKSB7XG4gICAgICAgIGlmICh0aW1lIDwgMTApIHJldHVybiBgMDA6MCR7dGltZX1gO1xuICAgICAgICByZXR1cm4gYDAwOiR7dGltZX1gO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGxldCBtaW4gPSBNYXRoLmZsb29yKHRpbWUgLyA2MCk7XG4gICAgICAgIGxldCBzZWNvbmRzID0gdGltZSAlIDYwO1xuICAgICAgICBpZiAobWluIDwgMTAgJiYgc2Vjb25kcyA8IDEwKSB7XG4gICAgICAgICAgICByZXR1cm4gYDAke21pbn06MCR7c2Vjb25kc31gXG4gICAgICAgIH0gZWxzZSBpZiAobWluIDwgMTAgJiYgc2Vjb25kcyA+PSAxMCkge1xuICAgICAgICAgICAgcmV0dXJuIGAwJHttaW59OiR7c2Vjb25kc31gXG4gICAgICAgIH0gZWxzZSBpZiAobWluID49IDEwICYmIHNlY29uZHMgPCAxMCkge1xuICAgICAgICAgICAgcmV0dXJuIGAke21pbn06MCR7c2Vjb25kc31gXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gYCR7bWlufToke3NlY29uZHN9YFxuICAgICAgICB9XG4gICAgfVxufVxuXG5mdW5jdGlvbiBwYXN0UnVuRGF0YShjaGFyYWN0ZXIsIHRpbWUsIGVycm9ycykge1xuICAgIGNvbnN0IHBhc3RSdW4gPSBuZXcgVHlwZVdyaXRpbmdDb25zb2xlKGNoYXJhY3RlciwgdGltZSwgZXJyb3JzKTtcbiAgICBsZXQgd3BtID0gcGFzdFJ1bi5jYWxjdWxhdGVXUE0oKTtcbiAgICBjb25zb2xlLmxvZyhwYXN0UnVuKVxuICAgIHBhc3RSdW4uX3Bhc3RDaGFyQ291bnQocGFzdFJ1bi5jaGFyYWN0ZXJDb3VudCk7XG4gICAgcGFzdFJ1bi5fcGFzdFRpbWVDYWwocGFzdFJ1bi50aW1lKVxuICAgIHBhc3RSdW4uX3Bhc3RFcnJvckNvdW50KHBhc3RSdW4uZXJyb3JzKVxuICAgIHBhc3RSdW4uX3Bhc3RXUE0od3BtKTtcbiAgICByZXR1cm4gcGFzdFJ1bjtcbn1cblxuXG5cbnJlbmRlck5ld1F1b3RlKCk7XG5cblxuXG4iXSwibmFtZXMiOlsiVHlwZVdyaXRpbmdDb25zb2xlIiwiUkFORE9NX1FVT1RFX0FQSV9VUkwiLCJxdW90ZURpc3BsYXkiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwicXVvdGVJbnB1dCIsInRpbWVyIiwiY2FudmFzRWwiLCJjdHgiLCJnZXRDb250ZXh0Iiwid2lkdGgiLCJoZWlnaHQiLCJnZXRSYW5kb21RdW90ZSIsInJlcyIsImZldGNoIiwib2siLCJkYXRhIiwianNvbiIsImNvbnRlbnQiLCJqb2luIiwibWV0YSIsIm1zZyIsImVycm9yIiwiY29uc29sZSIsImNoYXJDb3VudCIsImNoYXJIYXNoIiwiZXJyb3JBcnIiLCJwYXN0UnVuS2V5IiwiZXJyb3JDb3VudCIsInN0YXJ0VGltZSIsInBhc3RUaW1lIiwicmVuZGVyTmV3UXVvdGUiLCJwYXN0UnVuSW5zdGFuY2UiLCJwYXN0UnVuRGF0YSIsImxvZyIsImNoYXJhY3RlckNvdW50IiwidGltZSIsImVycm9ycyIsInF1b3RlIiwiaW5uZXJIVE1MIiwidmFsdWUiLCJzcGxpdCIsImZvckVhY2giLCJjaGFyIiwic3BhbiIsImNyZWF0ZUVsZW1lbnQiLCJjbGFzc05hbWUiLCJhcHBlbmRDaGlsZCIsInN0YXJ0VGltZXIiLCJhZGRFdmVudExpc3RlbmVyIiwiZSIsInF1b3RlU3BhbkFyciIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJpbnB1dFZhbEFyciIsImZpbmlzaGVkIiwiY2F1Z2h0RXJyb3JzIiwiY2hhclNwYW4iLCJpIiwiaW5wdXRDaGFyIiwiY2xhc3NMaXN0IiwicmVtb3ZlIiwiYWRkIiwiX2NhdGNoRXJvcnMiLCJxdW90ZVNwYW4iLCJpbmNsdWRlcyIsInB1c2giLCJsZW5ndGgiLCJEYXRlIiwic2V0SW50ZXJ2YWwiLCJjdXJyZW50VGltZSIsImdldFRpbWUiLCJyZW5kZXJUaW1lQXNDbG9jayIsIk1hdGgiLCJmbG9vciIsIm1pbiIsInNlY29uZHMiLCJjaGFyYWN0ZXIiLCJwYXN0UnVuIiwid3BtIiwiY2FsY3VsYXRlV1BNIiwiX3Bhc3RDaGFyQ291bnQiLCJfcGFzdFRpbWVDYWwiLCJfcGFzdEVycm9yQ291bnQiLCJfcGFzdFdQTSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/index.js\n");

/***/ }),

/***/ "./src/scripts/typewriting-console.js":
/*!********************************************!*\
  !*** ./src/scripts/typewriting-console.js ***!
  \********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ TypeWritingConsole; }\n/* harmony export */ });\nclass TypeWritingConsole {\n  constructor(characterCount, time, errors) {\n    console.log('hi from twc');\n    this.characterCount = characterCount;\n    this.time = time;\n    this.errors = errors;\n    this.minutes = parseInt(this.time.slice(0, 2));\n    this.seconds = parseInt(this.time.slice(3));\n  }\n  adjustTime() {\n    let adjSec = this.seconds / 60;\n    return this.minutes + adjSec;\n  }\n  calculateWPM() {\n    /*\n    A word is any 5+ char count \n    Gross WPM = (totalChars/5) / time(min)\n    Net WPM = Gros WPM - (errors / time(min))\n            = [(totalChars/5) - errors] / time(min)\n    */\n    let words = this.characterCount / 5;\n    let netWPM = Math.floor(Math.abs(words - this.errors) / this.adjustTime());\n    return netWPM;\n  }\n  _pastTimeCal(time) {\n    if (time) {\n      const pastTimeEle = document.getElementById('past-time');\n      pastTimeEle.innerHTML = \"\";\n      const span = document.createElement(\"span\");\n      span.innerHTML = `Past Run Time: ${time}`;\n      pastTimeEle.appendChild(span);\n    }\n  }\n  _pastCharCount(count) {\n    const pastCharCount = document.getElementById('past-charCount');\n    pastCharCount.innerHTML = \"\";\n    const span = document.createElement(\"span\");\n    span.innerHTML = `Past char count: ${count}`;\n    pastCharCount.appendChild(span);\n  }\n  _pastErrorCount(errorCount) {\n    const pastErrorCountEle = document.getElementById('error-count');\n    pastErrorCountEle.innerHTML = \"\";\n    const span = document.createElement(\"span\");\n    span.innerHTML = `Past error count: ${errorCount}`;\n    pastErrorCountEle.appendChild(span);\n  }\n  _pastWPM(wpm) {\n    const pastWPM = document.getElementById('past-wpm');\n    pastWPM.innerHTML = \"\";\n    const span = document.createElement('span');\n    span.innerHTML = `Past run's WPM: ${wpm}`;\n    pastWPM.appendChild(span);\n  }\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QU0sQ0FBQztJQUMzQ0QsSUFBSSxDQUFDRCxTQUFTLEdBQUksbUJBQWtCVyxHQUFJLEVBQUM7SUFDekNDLE9BQU8sQ0FBQ1QsV0FBVyxDQUFDRixJQUFJLENBQUM7RUFDN0I7QUFHSiIsInNvdXJjZXMiOlsid2VicGFjazovL0ZhdWx0eS1Sb2NrZXQvLi9zcmMvc2NyaXB0cy90eXBld3JpdGluZy1jb25zb2xlLmpzP2E1ZTkiXSwic291cmNlc0NvbnRlbnQiOlsiXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFR5cGVXcml0aW5nQ29uc29sZSB7XG5cbiAgICBjb25zdHJ1Y3RvcihjaGFyYWN0ZXJDb3VudCwgdGltZSwgZXJyb3JzKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdoaSBmcm9tIHR3YycpXG4gICAgICAgIHRoaXMuY2hhcmFjdGVyQ291bnQgPSBjaGFyYWN0ZXJDb3VudDtcbiAgICAgICAgdGhpcy50aW1lID0gdGltZTsgXG4gICAgICAgIHRoaXMuZXJyb3JzID0gZXJyb3JzOyBcbiAgICAgICAgdGhpcy5taW51dGVzID0gIHBhcnNlSW50KHRoaXMudGltZS5zbGljZSgwLDIpKTtcbiAgICAgICAgdGhpcy5zZWNvbmRzID0gcGFyc2VJbnQodGhpcy50aW1lLnNsaWNlKDMpKTtcbiAgICB9XG5cbiAgICBhZGp1c3RUaW1lKCkge1xuICAgICAgICBsZXQgYWRqU2VjID0gdGhpcy5zZWNvbmRzIC8gNjA7XG4gICAgICAgIHJldHVybiB0aGlzLm1pbnV0ZXMgKyBhZGpTZWM7XG4gICAgfVxuICAgIFxuICAgIGNhbGN1bGF0ZVdQTSgpIHtcbiAgICAgICAgLypcbiAgICAgICAgQSB3b3JkIGlzIGFueSA1KyBjaGFyIGNvdW50IFxuICAgICAgICBHcm9zcyBXUE0gPSAodG90YWxDaGFycy81KSAvIHRpbWUobWluKVxuICAgICAgICBOZXQgV1BNID0gR3JvcyBXUE0gLSAoZXJyb3JzIC8gdGltZShtaW4pKVxuICAgICAgICAgICAgICAgID0gWyh0b3RhbENoYXJzLzUpIC0gZXJyb3JzXSAvIHRpbWUobWluKVxuICAgICAgICAqL1xuICAgICAgICBsZXQgd29yZHMgPSAodGhpcy5jaGFyYWN0ZXJDb3VudCAvIDUpXG4gICAgICAgIGxldCBuZXRXUE0gPSBNYXRoLmZsb29yKE1hdGguYWJzKHdvcmRzIC0gdGhpcy5lcnJvcnMpIC8gdGhpcy5hZGp1c3RUaW1lKCkpXG4gICAgICAgIHJldHVybiBuZXRXUE07XG4gICAgfVxuICAgICBfcGFzdFRpbWVDYWwodGltZSkge1xuICAgICAgICBpZiAodGltZSkge1xuICAgICAgICAgICAgY29uc3QgcGFzdFRpbWVFbGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGFzdC10aW1lJylcbiAgICAgICAgICAgIHBhc3RUaW1lRWxlLmlubmVySFRNTCA9IFwiXCJcbiAgICAgICAgICAgIGNvbnN0IHNwYW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcbiAgICAgICAgICAgIHNwYW4uaW5uZXJIVE1MID0gYFBhc3QgUnVuIFRpbWU6ICR7dGltZX1gO1xuICAgICAgICAgICAgcGFzdFRpbWVFbGUuYXBwZW5kQ2hpbGQoc3Bhbik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAgX3Bhc3RDaGFyQ291bnQoY291bnQpIHtcbiAgICAgICAgY29uc3QgcGFzdENoYXJDb3VudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwYXN0LWNoYXJDb3VudCcpXG4gICAgICAgIHBhc3RDaGFyQ291bnQuaW5uZXJIVE1MID0gXCJcIjtcbiAgICAgICAgY29uc3Qgc3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xuICAgICAgICBzcGFuLmlubmVySFRNTCA9IGBQYXN0IGNoYXIgY291bnQ6ICR7Y291bnR9YDtcbiAgICAgICAgcGFzdENoYXJDb3VudC5hcHBlbmRDaGlsZChzcGFuKTtcbiAgICB9XG5cbiAgICAgX3Bhc3RFcnJvckNvdW50KGVycm9yQ291bnQpIHtcbiAgICAgICAgY29uc3QgcGFzdEVycm9yQ291bnRFbGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZXJyb3ItY291bnQnKVxuICAgICAgICBwYXN0RXJyb3JDb3VudEVsZS5pbm5lckhUTUwgPSBcIlwiO1xuICAgICAgICBjb25zdCBzcGFuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XG4gICAgICAgIHNwYW4uaW5uZXJIVE1MID0gYFBhc3QgZXJyb3IgY291bnQ6ICR7ZXJyb3JDb3VudH1gO1xuICAgICAgICBwYXN0RXJyb3JDb3VudEVsZS5hcHBlbmRDaGlsZChzcGFuKTtcbiAgICB9XG5cbiAgICAgX3Bhc3RXUE0od3BtKSB7XG4gICAgICAgIGNvbnN0IHBhc3RXUE0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGFzdC13cG0nKTtcbiAgICAgICAgcGFzdFdQTS5pbm5lckhUTUwgPSBcIlwiO1xuICAgICAgICBjb25zdCBzcGFuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICAgICBzcGFuLmlubmVySFRNTCA9IGBQYXN0IHJ1bidzIFdQTTogJHt3cG19YDtcbiAgICAgICAgcGFzdFdQTS5hcHBlbmRDaGlsZChzcGFuKTtcbiAgICB9XG5cbiAgICBcbn0iXSwibmFtZXMiOlsiVHlwZVdyaXRpbmdDb25zb2xlIiwiY29uc3RydWN0b3IiLCJjaGFyYWN0ZXJDb3VudCIsInRpbWUiLCJlcnJvcnMiLCJjb25zb2xlIiwibG9nIiwibWludXRlcyIsInBhcnNlSW50Iiwic2xpY2UiLCJzZWNvbmRzIiwiYWRqdXN0VGltZSIsImFkalNlYyIsImNhbGN1bGF0ZVdQTSIsIndvcmRzIiwibmV0V1BNIiwiTWF0aCIsImZsb29yIiwiYWJzIiwiX3Bhc3RUaW1lQ2FsIiwicGFzdFRpbWVFbGUiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwiaW5uZXJIVE1MIiwic3BhbiIsImNyZWF0ZUVsZW1lbnQiLCJhcHBlbmRDaGlsZCIsIl9wYXN0Q2hhckNvdW50IiwiY291bnQiLCJwYXN0Q2hhckNvdW50IiwiX3Bhc3RFcnJvckNvdW50IiwiZXJyb3JDb3VudCIsInBhc3RFcnJvckNvdW50RWxlIiwiX3Bhc3RXUE0iLCJ3cG0iLCJwYXN0V1BNIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/scripts/typewriting-console.js\n");

/***/ }),

/***/ "./src/index.scss":
/*!************************!*\
  !*** ./src/index.scss ***!
  \************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvaW5kZXguc2Nzcy5qcyIsIm1hcHBpbmdzIjoiO0FBQUEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9GYXVsdHktUm9ja2V0Ly4vc3JjL2luZGV4LnNjc3M/OTc0NSJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/index.scss\n");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval-source-map devtool is used.
/******/ 	__webpack_require__("./src/index.js");
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.scss");
/******/ 	
/******/ })()
;