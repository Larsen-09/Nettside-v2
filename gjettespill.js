const inputs = document.querySelector(".inputs"),
hintTag = document.querySelector(".hint span"),
guessLeft = document.querySelector(".guess-left span"),
wrongLetter = document.querySelector(".wrong-letter span"),
resetBtn = document.querySelector(".reset-btn"),
typingInput = document.querySelector(".typing-input");
let word, maxGuesses, incorrectLetters = [], correctLetters = [], correctCount = 0;
function randomWord() {
    let ranItem = wordList[Math.floor(Math.random() * wordList.length)];
    word = ranItem.word;
    maxGuesses = word.length >= 5 ? 8 : 6;
    correctLetters = []; incorrectLetters = []; correctCount = 0;
    hintTag.innerText = ranItem.hint;
    guessLeft.innerText = maxGuesses;
    wrongLetter.innerText = incorrectLetters.join(', ');
    let html = "";
    for (let i = 0; i < word.length; i++) {
        html += `<input type="text" disabled>`;
    }
    inputs.innerHTML = html;
}
randomWord();
function initGame(e) {
    let key = e.target.value.toLowerCase();
    if (!key.match(/^[a-z]$/)) { typingInput.value = ""; return; }

    if (incorrectLetters.includes(key) || correctLetters.includes(key)) {
        typingInput.value = "";
        return;
    }

    const inputEls = inputs.querySelectorAll("input");

    if (word.includes(key)) {

        for (let i = 0; i < word.length; i++) {
            if (word[i] === key && inputEls[i].value === "") {
                inputEls[i].value = key;
                correctCount++;
            }
        }
        correctLetters.push(key);
    } else {
        maxGuesses--;
        incorrectLetters.push(key);
    }

    guessLeft.innerText = maxGuesses;
    wrongLetter.innerText = incorrectLetters.join(', ');
    typingInput.value = "";

    setTimeout(() => {
        if (correctCount === word.length) {
            alert(`Gratulerer! Du fant ordet ${word.toUpperCase()}`);
            randomWord();
        } else if (maxGuesses < 1) {
            alert("Game over! Du har ikke flere gjett");
            for (let i = 0; i < word.length; i++) {
                inputEls[i].value = word[i];
            }
        }
    }, 100);
}
resetBtn.addEventListener("click", randomWord);
typingInput.addEventListener("input", initGame);
inputs.addEventListener("click", () => typingInput.focus());

document.addEventListener("keydown", (e) => {
    const active = document.activeElement;
    const tag = active && active.tagName ? active.tagName.toLowerCase() : '';
    if (tag === 'input' || tag === 'textarea' || (active && active.isContentEditable)) return;
    typingInput.focus();
});