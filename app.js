const guessField = document.getElementById("guessField");
const guessSubmit = document.querySelector("#guessSubmit");
const resultParas = document.querySelector(".resultParas");
const prevGuessesMsg = document.querySelector(".prevGuessesMsg");
const guessList = document.querySelector(".guessList");
const latestGuess = document.querySelector(".latestGuess");
const lowOrHi = document.querySelector(".lowOrHi");

const numberToGuess = Math.floor(Math.random() * 100) + 1;
let numGuesses = 1;
let currentGuess;

function checkGuess() {
    const userGuess = Number(guessField.value)
    currentGuess = userGuess; 

    if (userGuess === numberToGuess) {
        gameStates.correctGuess()
    } else {
        gameStates.wrongGuess()
    }
    numGuesses++;
}

guessSubmit.addEventListener("click", checkGuess)

const gameStates = {
    correctGuess: function() {
        latestGuess.textContent = "You guessed right!"
        lowOrHi.textContent = `It took you ${numGuesses} guesses!`
        const resetButton = document.createElement("button")
        resetButton.textContent = "Reset game";
        resetButton.classList.add("resetBtn");
        resultParas.appendChild(resetButton);
        resetButton.addEventListener('click', gameStates.resetGame);
        /* add correct guess to guessList, and make its color green */
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
    resetGame: function() {
        numGuesses = 0;
        resultParas.innerHTML = 
        `<p class="prevGuessesMsg"></p>
        <ul class="guessList"></ul>
        <p class="latestGuess"></p>
        <p class="lowOrHi"></p>`
        
    },
    notANumber: function() {
        console.log('i fired')
    }
}