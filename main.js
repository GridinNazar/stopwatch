const timer = document.querySelector('.stopwatch__time').firstElementChild;
const startButton = document.querySelector('.stopwatch__start-button');
const stopButton = document.querySelector('.stopwatch__stop-button');
const resetButton = document.querySelector('.stopwatch__reset-button');

let isWorking = false;
let interval;

const parseStringTimeToMilliSec = (str) => {
    const [min, sec, msec] = str.split(':');
    return ((min * 60 + +sec) * 1000 + +msec * 100);
}

const parseMilliSecToStringTime = (num) => {
    const min = (num / 1000 / 60) | 0;
    const sec = (num / 1000 - min * 60) | 0;
    const msec = ((num / 1000 - min * 60 - sec) * 10) | 0;
    return `${min < 10 ? '0' + min : min}:${sec < 10 ? '0' + sec : sec}:${msec < 10 ? '0' + msec : msec}`;
}

const handleButtonClick = (e) => {
    e.preventDefault();
    startButton.classList.toggle('hidden')
    stopButton.classList.toggle('hidden')

    switch (e.target) {
        case startButton:
            startTimer()
            break
        case stopButton:
            stopTimer()
            break
        case resetButton:
            resetTimer()
            break
    }
}

const startTimer = () => {
    if (isWorking) return;
    isWorking = true;
    resetButton.removeAttribute('disabled')

    let time = parseStringTimeToMilliSec(timer.textContent);

    interval = setInterval(() => {
        time += 10
        timer.textContent = parseMilliSecToStringTime(time);
    }, 10)
}

const stopTimer = () => {
    clearInterval(interval);
    isWorking = false;
}

const resetTimer = () => {
    isWorking = false;
    resetButton.setAttribute('disabled', `disabled`);
    clearInterval(interval);
    timer.textContent = parseMilliSecToStringTime(0);
}

startButton.addEventListener('click', handleButtonClick)
stopButton.addEventListener('click', handleButtonClick)
resetButton.addEventListener('click', handleButtonClick)