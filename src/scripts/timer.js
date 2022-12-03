

export default class Timer {
    constructor() {
        this.startTime = new Date();
        this.pastTime;
    }
    
    startTimer() {
        // console.log(charHash, pastTime, errorCount)
        const timer = document.getElementById("timer");
        timer.innerHTML = `00:00`;
        // startTime = new Date();
        setInterval(() => {
            let currentTime = this.getTime();
            timer.innerHTML = this.renderTimeAsClock(currentTime);
            this.pastTime = timer.innerHTML;
        }, 1000);
        // let pastRunInstance = pastRunData(charCount, pastTime, errorCount)
        // console.log(pastRunInstance)
    }

    getTime() {
        return Math.floor((new Date() - this.startTime) / 1000)
    }

    renderTimeAsClock(time) {
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
}
