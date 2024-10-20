let setBtn = document.getElementById('set_btn');
let activeTimersContainer = document.getElementById('activeTimers');
let timerSound = document.getElementById('timerSound');
let timers = [];

setBtn.addEventListener('click', (event) => {
    event.preventDefault();

    // Get user input
    let hrs = parseInt(document.getElementById('hours').value) || 0;
    let min = parseInt(document.getElementById('minutes').value) || 0;
    let sec = parseInt(document.getElementById('seconds').value) || 0;

    // Validate input
    if (hrs === 0 && min === 0 && sec === 0) {
        alert("Please set a valid time.");
        return;
    }

    // Convert everything to seconds for the countdown
    let totalSeconds = hrs * 3600 + min * 60 + sec;

    // Create a timer object
    let timer = {
        id: Date.now(), // unique ID for each timer
        totalTime: totalSeconds,
        remainingTime: totalSeconds,
        intervalId: null
    };

    // Start the timer
    startTimer(timer);

    // Store timer in an array for future reference
    timers.push(timer);

    // Display the timer
    displayTimer(timer);
});

function startTimer(timer) {
    timer.intervalId = setInterval(() => {
        if (timer.remainingTime > 0) {
            timer.remainingTime--;
            updateTimerDisplay(timer);
        } else {
            endTimer(timer);
        }
    }, 1000);
}

function displayTimer(timer) {
    // Create timer card
    let timerCard = document.createElement('div');
    timerCard.classList.add('newAddCard');
    timerCard.id = `timer-${timer.id}`;
    timerCard.innerHTML = `
        <span class="time-display">${formatTime(timer.remainingTime)}</span>
        <button class="stop-btn" data-id="${timer.id}">Stop Timer</button>
    `;

    // Add stop button functionality
    timerCard.querySelector('.stop-btn').addEventListener('click', () => {
        stopTimer(timer.id);
    });

    activeTimersContainer.appendChild(timerCard);
}

function updateTimerDisplay(timer) {
    let timerCard = document.getElementById(`timer-${timer.id}`);
    if (timerCard) {
        timerCard.querySelector('.time-display').innerText = formatTime(timer.remainingTime);
    }
}

function formatTime(seconds) {
    let hrs = Math.floor(seconds / 3600);
    let min = Math.floor((seconds % 3600) / 60);
    let sec = seconds % 60;
    return `${hrs}h ${min}m ${sec}s`;
}

function stopTimer(timerId) {
    let timer = timers.find(t => t.id === timerId);
    if (timer) {
        clearInterval(timer.intervalId);
        removeTimerDisplay(timerId);
    }
}

function removeTimerDisplay(timerId) {
    let timerCard = document.getElementById(`timer-${timerId}`);
    if (timerCard) {
        timerCard.remove();
    }
}

function endTimer(timer) {
    clearInterval(timer.intervalId);

    let timerCard = document.getElementById(`timer-${timer.id}`);
    if (timerCard) {
        timerCard.classList.add('timerEnded');
        timerCard.querySelector('.time-display').innerText = 'Time’s Up!';
    }

    // Play audio alert
    timerSound.play();
}
