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

    if (numGuesses > 10) {
        gameStates.loseGame();
    } else if (userGuess === numberToGuess) {
        gameStates.correctGuess()
    } else {
        gameStates.wrongGuess()
    }
    numGuesses++;
    guessField.value = "";
}

guessSubmit.addEventListener("click", checkGuess);
guessField.addEventListener("keypress", event => {
    if (event.key === "Enter") {
        checkGuess();
    }
});

const gameStates = {
    correctGuess: function() {
        const newLi = document.createElement('li');
        newLi.textContent = `${currentGuess}`;
        newLi.className = 'green'
        guessList.appendChild(newLi);
        latestGuess.textContent = `You guessed right! The correct number was ${currentGuess}`
        lowOrHi.textContent = `It took you ${numGuesses} guesses!`
        resultParas.appendChild(resetBtn());
        toggleInputs();
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
        lowOrHi.textContent = `Oops, you exceeded the guess limit!
        better luck next time!`
        resultParas.appendChild(resetBtn());
        toggleInputs();
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
        toggleInputs();
    },
}

function resetBtn() {
    const resetButton = document.createElement("button")
    resetButton.textContent = "Reset game";
    resetButton.classList.add("resetBtn");
    resetButton.addEventListener('click', gameStates.resetGame);
    return resetButton;
}

function toggleInputs() {
    if (!guessField.disabled) {
        guessField.disabled = true;
    } else {
        guessField.disabled = false;
    }

    if (!guessSubmit.disabled) {
        guessSubmit.disabled = true;
    } else {
        guessSubmit.disabled = false;
    }
}
