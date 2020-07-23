let min = 1,
  max = 100,
  winnningNum = getRandomNum(min, max),
  guessesLeft = 7;

const game = document.querySelector('#game'),
  minNum = document.querySelector('.min-num'),
  maxNum = document.querySelector('.max-num'),
  guessBtn = document.querySelector('#guess-btn'),
  guessInput = document.querySelector('#guess-input'),
  message = document.querySelector('.message'),
  theme = document.querySelector('.theme');

minNum.textContent = min;
maxNum.textContent = max;

theme.addEventListener('click', () => {
  let body = document.body;
  body.classList.toggle('dark-mode');

  if (theme.value === 'Light') {
    theme.value = 'Dark';
  } else {
    theme.value = 'Light';
  }
});

game.addEventListener('mousedown', (e) => {
  if (e.target.classList.contains('play-again')) {
    window.location.reload();
  }
});

guessBtn.addEventListener('click', (e) => {
  let guess = parseInt(guessInput.value);
  // console.log(guess);

  if (isNaN(guess) || guess < min || guess > max) {
    setMessage(`Please enter a number between ${min} and ${max}`, 'red');
  } else {
    if (guess === winnningNum) {
      gameOver(true, `${guess} is correct, YOU WIN!`);
    } else {
      guessesLeft -= 1;

      if (guessesLeft == 0) {
        gameOver(
          false,
          `Game Over, you lost. The correct number was ${winnningNum}`
        );
      } else {
        if (winnningNum > guess) {
          setMessage(
            `${guess} is not correct. My guess is higher! You have ${guessesLeft} guesses left`,
            'orange'
          );
        } else {
          setMessage(
            `${guess} is not correct. My guess is lower! ${guessesLeft} guesses left`,
            'orange'
          );
        }
      }
    }
  }

  guessInput.value = '';

  e.preventDefault();
});

function gameOver(won, msg) {
  guessInput.disabled = true;

  let color;
  won === true ? (color = 'green') : (color = 'red');
  guessInput.style.border = `2px solid ${color}`;
  guessInput.style.color = `${color}`;

  setMessage(msg, color);

  // Play again
  guessBtn.value = 'Play Again';
  // console.log('game over');
  guessBtn.className = 'play-again';
}

function setMessage(msg, color) {
  message.textContent = msg;
  message.style.color = color;
}

function getRandomNum(min, max) {
  return Math.round(Math.random() * (max - min + 1) + min);
}
