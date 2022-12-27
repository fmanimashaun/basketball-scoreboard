// Get the elements from the DOM
const startBtn = document.querySelector('.start__btn');
const resetBtn = document.querySelector('.reset__btn');
const pauseBtn = document.querySelector('.pause__btn');
const gameTimer = document.querySelector('.timer-content');
const homeScore = document.querySelector('#score_home');
const awayScore = document.querySelector('#score_guest');
const homeScoringBtnCollection = document.querySelector('.home__scoring-btn').querySelectorAll('button');
const awayScoringBtnCollection = document.querySelector('.away__scoring-btn').querySelectorAll('button');

// Updating the home score with the scoring buttons
homeScoringBtnCollection.forEach((btn) => {
  btn.addEventListener('click', (event) => {
    if (event.target.innerText === '+1') {
      homeScore.innerText = parseInt(homeScore.innerText) + 1;
    } else if (event.target.innerText === '+2') {
      homeScore.innerText = parseInt(homeScore.innerText) + 2;
    } else {
      homeScore.innerText = parseInt(homeScore.innerText) + 3;
    }
  });
});

// Updating the away score with the scoring buttons
awayScoringBtnCollection.forEach((btn) => {
  btn.addEventListener('click', (event) => {
    if (event.target.innerText === '+1') {
      awayScore.innerText = parseInt(awayScore.innerText) + 1;
    } else if (event.target.innerText === '+2') {
      awayScore.innerText = parseInt(awayScore.innerText) + 2;
    } else {
      awayScore.innerText = parseInt(awayScore.innerText) + 3;
    }
  });
});

// Timer functionality

let gameDuration;
let pause = false;
let startTime = 70; // 12 minutes

const gameCountDown = (time) => {
  gameDuration = setInterval(() => {
    if (pause) {
      return;
    }
    time--;
    let minutes = Math.floor(time / 60);
    minutes = minutes < 10 ? '0' + minutes : minutes;
    let seconds = time % 60;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    gameTimer.innerText = `${minutes}:${seconds}`;

    if (time < 60) {
      gameTimer.classList.add('red-text');
    }

    if (time === 0) {
      stopTimer();
      gameTimer.classList.add('blink');
    }
  }, 1000);
};


// Start the timer
startBtn.addEventListener('click', () => {
  gameCountDown(startTime);
});

// stop countdown at zero second
const stopTimer = () => {
  gameDuration = clearInterval(gameDuration);
};







// Create a timer that runs from 0 to 12 minutes
// at the end of the timer, score of the highest should be blinking with a color change to green
// if the score is same, the color should be yellow for both team and the score should blink
// add Confetti Falling effect when the timer ends