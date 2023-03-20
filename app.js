const guessField = document.getElementById("guessField");
const guessSubmit = document.querySelector("#guessSubmit");
const resultParas = document.querySelector(".resultParas");
const prevGuessesMsg = document.querySelector(".prevGuessesMsg");
const guessList = document.querySelector(".guessList");
const latestGuess = document.querySelector(".latestGuess");
const lowOrHi = document.querySelector(".lowOrHi");

let numberToGuess = Math.floor(Math.random() * 100) + 1;
console.log(numberToGuess);
let numGuesses = 1;
let currentGuess;

function checkGuess() {
    const userGuess = Number(guessField.value);
    currentGuess = userGuess;
    /* add check for more than 10 guesses */

    if (numGuesses > 10) {
        console.log('you lose!')
    } else if (userGuess === numberToGuess) {
        gameStates.correctGuess()
    } else {
        gameStates.wrongGuess()
    }
    numGuesses++;
}

guessSubmit.addEventListener("click", checkGuess)

const gameStates = {
    correctGuess: function() {
        const newLi = document.createElement('li');
        newLi.textContent = `${currentGuess}`;
        newLi.className = 'green'
        guessList.appendChild(newLi);
        latestGuess.textContent = `You guessed right! The correct number was ${currentGuess}`
        lowOrHi.textContent = `It took you ${numGuesses} guesses!`
        const resetButton = document.createElement("button")
        resetButton.textContent = "Reset game";
        resetButton.classList.add("resetBtn");
        resultParas.appendChild(resetButton);
        resetButton.addEventListener('click', gameStates.resetGame);
    },
    wrongGuess: function() {
        prevGuessesMsg.textContent = 'Your previous guesses were:'
        const newLi = document.createElement('li');
        newLi.textContent = `${currentGuess}`;
        guessList.appendChild(newLi);

        if (currentGuess < numberToGuess) {
            lowOrHi.textContent = `You guessed too low!`
        } else {
            lowOrHi.textContent = `You guessed too high!`
        }
    },
    loseGame: function() {

    },
    resetGame: function() {
        numGuesses = 1;
        numberToGuess = Math.floor(Math.random() * 100) + 1;
        console.log(numberToGuess);
        prevGuessesMsg.textContent = "";
        while (guessList.firstChild) {
            guessList.removeChild(guessList.firstChild);
        }
        latestGuess.textContent = "";
        lowOrHi.textContent = "";
        resultParas.removeChild(resultParas.lastChild);
    },
}