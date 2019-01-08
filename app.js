let min = 1,
  max = 10,
  winningNum = setRandomNum(min, max),
  guessLeft = 3;
const game = document.querySelector('#game'),
  minNum = document.querySelector('.min-num'),
  maxNum = document.querySelector('.max-num'),
  guessBtn = document.querySelector('#guess-btn'),
  guessInput = document.querySelector('#guess-input'),
  message = document.querySelector('.message');

minNum.textContent = min;
maxNum.textContent = max;
game.addEventListener('mousedown', (e) => {
  if (e.target.className === 'play-again') {
    window.location.reload();
  }
});

guessBtn.addEventListener('click', () => {
  let guess = parseInt(guessInput.value)
  if (isNaN(guess) || guess < min || guess > max) {
    setMessage(`Enter a number between ${min} and ${max}`, 'red');
    return;
  }
  if (guess == winningNum) {
    gameOver(true, `${winningNum} is correct, you win!`);
  } else {
    guessLeft -= 1;
    if (guessLeft === 0) {
      gameOver(false, `${guess} was incorrect, the number was ${winningNum} GAME OVER...`);
    } else {
      guessInput.style.borderColor = 'red';
      guessInput.value = '';
      setMessage(`${guess} was incorrect, ${guessLeft} guesses left`, 'red');
    }
  }
})

function gameOver(won, msg) {
  let color;
  won === true ? color = 'green' : color = 'red'
  guessInput.disabled = true;
  guessInput.style.borderColor = color;
  setMessage(msg, color);
  guessBtn.value = 'Play Again';
  guessBtn.className += 'play-again';
}

function setMessage(msg, color) {
  message.style.color = color;
  message.textContent = msg;
}

function setRandomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}