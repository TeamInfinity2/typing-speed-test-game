const quotes = [
    "The quick brown fox jumps over the lazy dog.",
    "Practice makes perfect.",
    "Better late than never.",
    "To be or not to be, that is the question.",
    "All that glitters is not gold.",
    "A picture is worth a thousand words.",
    "Fortune favors the brave.",
    "Actions speak louder than words.",
    "A journey of a thousand miles begins with a single step."
];

const quoteDisplay = document.getElementById("quote");
const inputArea = document.getElementById("input-area");
const timeLeftDisplay = document.getElementById("time-left");
const wpmDisplay = document.getElementById("wpm");
const accuracyDisplay = document.getElementById("accuracy");

let currentQuote = "";
let timer;
let timeLeft = 30;
let totalWordsTyped = 0;
let totalCharactersTyped = 0;
let correctCharactersTyped = 0;

// Function to generate a random quote
function getRandomQuote() {
    return quotes[Math.floor(Math.random() * quotes.length)];
}

// Function to start the typing test
function startGame() {
    currentQuote = getRandomQuote();
    quoteDisplay.textContent = currentQuote;
    inputArea.value = "";
    inputArea.disabled = false;
    inputArea.focus();

    timeLeft = 30;
    totalWordsTyped = 0;
    totalCharactersTyped = 0;
    correctCharactersTyped = 0;
    wpmDisplay.textContent = 0;
    accuracyDisplay.textContent = 0;

    clearInterval(timer);
    timer = setInterval(updateTime, 1000);
}

// Function to update the timer
function updateTime() {
    if (timeLeft > 0) {
        timeLeft--;
        timeLeftDisplay.textContent = timeLeft;
    } else {
        endGame();
    }
}

// Function to handle typing input
inputArea.addEventListener("input", function() {
    const userInput = inputArea.value;
    totalCharactersTyped = userInput.length;
    correctCharactersTyped = 0;

    // Count correct characters
    for (let i = 0; i < userInput.length; i++) {
        if (userInput[i] === currentQuote[i]) {
            correctCharactersTyped++;
        }
    }

    // Update accuracy
    const accuracy = (correctCharactersTyped / totalCharactersTyped) * 100;
    accuracyDisplay.textContent = isNaN(accuracy) ? 0 : Math.round(accuracy);

    // Calculate WPM
    const wordsTyped = userInput.trim().split(/\s+/).length;
    totalWordsTyped = wordsTyped;
    const wpm = (totalWordsTyped * (30 / (30 - timeLeft)));
    wpmDisplay.textContent = isNaN(wpm) ? 0 : Math.round(wpm);
});

// Function to end the typing test
function endGame() {
    clearInterval(timer);
    inputArea.disabled = true;
    alert(`Time's up! Your WPM is ${wpmDisplay.textContent} and accuracy is ${accuracyDisplay.textContent}%.`);
}
