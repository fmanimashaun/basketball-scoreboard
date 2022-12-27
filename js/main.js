// Get the elements from the DOM
const startBtn = document.querySelector('.start__btn');
const resetBtn = document.querySelector('.reset__btn');
const pauseBtn = document.querySelector('.pause__btn');
const hurrayBtn = document.querySelector('.hurray__btn');
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
      if (parseInt(homeScore.innerText) > parseInt(awayScore.innerText)) {
        homeScore.classList.remove('red-text');
        homeScore.classList.add('green-text');
        party.confetti(homeScore, {
          count: party.variation.range(20, 40),
        });
      } else if (parseInt(homeScore.innerText) < parseInt(awayScore.innerText)) {
        awayScore.classList.remove('red-text');
        awayScore.classList.add('green-text');
        party.confetti(awayScore, {
          count: party.variation.range(20, 40),
        });
      } else {
        homeScore.classList.remove('red-text');
        awayScore.classList.remove('red-text');
        homeScore.classList.add('yellow-text');
        awayScore.classList.add('yellow-text');
      }
    }
  }, 1000);
};

// stop countdown at zero second
const stopTimer = () => {
  gameDuration = clearInterval(gameDuration);
};

// Start the timer
startBtn.addEventListener('click', () => {
  // const startTimeArr = (gameTimer.innerText).split(':');
  // const startTime = parseInt(startTimeArr[0]) * 60 + parseInt(startTimeArr[1]);
  gameCountDown(20);
  startBtn.classList.add('hide');
});

// Pause the timer
pauseBtn.addEventListener('click', (event) => {
  if (event.target.innerText === 'Pause') {
    pause = true;
    event.target.innerText = 'Resume';
  } else {
    pause = false;
    event.target.innerText = 'Pause';
  }
});

// Reset functionality
const resetGame = () => {
  gameTimer.innerText = '12:00';
  gameTimer.classList.remove('red-text');
  gameTimer.classList.remove('blink');
  homeScore.classList.remove('green-text, yellow-text');
  awayScore.classList.remove('green-text, yellow-text');
  homeScore.classList.add('red-text');
  awayScore.classList.add('red-text');
  homeScore.innerText = '0';
  awayScore.innerText = '0';
  startBtn.classList.remove('hide');
  pauseBtn.innerText = 'Pause';
  pause = false;
  stopTimer();
};

// add event listener to reset button
resetBtn.addEventListener('click', resetGame);

// Create a timer that runs from 0 to 12 minutes
// at the end of the timer, score of the highest should be blinking with a color change to green
// if the score is same, the color should be yellow for both team and the score should blink
// add Confetti Falling effect when the timer ends