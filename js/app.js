/* eslint-disable no-unused-vars */
let level = 0;

function showGame(mode){
  level = mode;
  document.getElementById('memory-game-intro').style.display = 'none';
  document.getElementById('memory-game').style.display = 'flex';
  return level;
}

console.log(level);

const cards = document.querySelectorAll('.memory-card');
let counter = 0;

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {
  console.log(level);
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');
  this.classList.add('poof');

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;

    if(level === 2){
       if (firstCard.dataset.framework === 'Evs1'){  

         setTimeout(() => {
           document.getElementById('memory-game').style.display = 'none';
           document.getElementById('gameOver').style.display = 'inline-block';
          }, 1500);
        }
    }

    return;
  }

  secondCard = this;
  checkForMatch();
}

function checkForMatch() {

  if(level === 2){

  if (secondCard.dataset.framework === 'Evs1'){

    setTimeout(() => {
      document.getElementById('memory-game').style.display = 'none';
      document.getElementById('gameOver').style.display = 'inline-block';
    }, 1500);

  }
 }

  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  counter++;
  if (counter === 8){

    setTimeout(() => {
      document.getElementById('memory-game').style.display = 'none';
      document.getElementById('won').style.display = 'inline-block';
    }, 150);
  }

  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  resetBoard();
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    firstCard.classList.remove('poof');
    secondCard.classList.remove('flip');
    secondCard.classList.remove('poof');

    resetBoard();
  }, 1500);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})();

cards.forEach(card => card.addEventListener('click', flipCard));