"use strict";

//Selecting elements
const player0El = document.querySelector(".player--0");
const score0El = document.getElementById("score--0");
const current0El = document.getElementById("current--0");

const player1El = document.querySelector(".player--1");
const score1El = document.getElementById("score--1");
const current1El = document.getElementById("current--1");

const diceEl = document.querySelector(".dice");
const btnRoll = document.querySelector(".btn--roll");
const btnNew = document.querySelector(".btn--new");
const btnHold = document.querySelector(".btn--hold");

//Rules
const rules = document.querySelector(".rules");
const overlay = document.querySelector(".overlay");
const btnCloseRules = document.querySelector(".close-rules");
const btnsOpenRules = document.querySelector(".show-rules");

const openRules = function () {
  rules.classList.remove("hidden"); //no dot for class name here.
  overlay.classList.remove("hidden");
};

const closeRules = function () {
  rules.classList.add("hidden");
  overlay.classList.add("hidden");
};

btnsOpenRules.addEventListener("click", openRules);
btnCloseRules.addEventListener("click", closeRules);
overlay.addEventListener("click", closeRules);

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape" && !rules.classList.contains("hidden")) {
    closeRules();
  }
});

//Starting conditions

let scores, currentScore, activePlayer, playing;

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0; // needs to be 0 as scores are stored in an array and arrays are 0 based.
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add("hidden");
  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");
};
init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};

//Rolling dice functionality

btnRoll.addEventListener("click", function () {
  if (playing) {
    // 1. Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    // 2. Display dice
    diceEl.classList.remove("hidden");
    diceEl.src = `Images/dice-${dice}.png`;
    // 3. Check for rolled 1:
    if (dice !== 1) {
      //Add dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //If true switch to new player
      switchPlayer();
    }
  }
});

btnHold.addEventListener("click", function () {
  if (playing) {
    // 1. Add current score to active player's score
    scores[activePlayer] += currentScore;

    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    // 2. Check if players score is >= 100
    if (scores[activePlayer] >= 100) {
      // Finish game
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
      diceEl.classList.add("hidden");
    } else {
      // Switch to next player
      switchPlayer();
    }
  }
});

btnNew.addEventListener("click", init);
