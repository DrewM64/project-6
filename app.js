const qwerty = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
const overlay = document.getElementById('overlay');
const heading = overlay.getElementsByTagName("h2")[0];
const buttonReset = document.getElementsByClassName('btn__reset')[0];
const letter = document.getElementsByClassName("letter");
let show = document.getElementsByClassName("show");
let missed = 0;
const hearts = document.querySelectorAll('img');
const phrases = ["eat hot chip", 
                'go tuck yourself in', 
                'rubber babies', 
                'hey arnold', 
                'the things i do for love', 
                'ya like jazz',
                'people like grapes',
                'mother get my celebratory clean diaper'];


function getRandomPhraseAsArray(arr) {
    //choose random phrase from array 
    const rand = Math.floor (Math.random() * arr.length);
    //split into new array of characters
    const str = arr[rand];
    const charArray = str.split('');
    //return the new character array
    return charArray;
}


function addPhraseToDisplay(arr) {
    //loop through arr, 
    for (let i = 0; i < arr.length; i++) {
        //create an li in #phrase ul for each item
        const li = document.createElement('li');
        li.textContent = arr[i];
        //if character is a letter, assign class "letter" to li
        if (arr[i] !== ' ') {
            li.className = "letter";
        } else {
            li.className = "space";
        }
        phrase.appendChild(li);
    }
}
//check if button user clicks is in the "letter" class
function checkLetter(button) {
    const ListLI = phrase.getElementsByTagName('li');
    let match = null;
    for (let i = 0; i<ListLI.length; i++) {
        //if button text === letter li text
        if (ListLI[i].className==="letter" && button.textContent === ListLI[i].textContent) {
            //when match is found, letter li gets "show" class & match = letter
            ListLI[i].classList.add("show");
            ListLI[i].style.transition = "all .5s";
            match = button.textContent;
        } 
    }
    //if no match found, return match = null, exit function
    return match;
}

// checks if user wins or loses by checking shown letter length, or missed count
function checkWin() {
    if (letter.length === show.length) {
        overlay.classList.add("win");
        heading.textContent = "Congrats, you won!"
        overlay.style.display = "flex";
        buttonReset.textContent = "Play again?"
        buttonReset.addEventListener('click', () => {
            resetGame();
            });
    } else if (missed >= 5) {
        overlay.classList.add("lose");
        heading.textContent = "You lose..."
        overlay.style.display = "flex";
        buttonReset.textContent = "Play again?"
        buttonReset.addEventListener('click', () => {
            resetGame();
            });
    }
}

//listen for the "Start Game" button to be clicked
buttonReset.addEventListener('click', () => {
    overlay.style.display = "none";
    });

//listen for onscreen keyboard clicks, check if letter is found
qwerty.addEventListener("click", (e) => {
    if (e.target.tagName === 'BUTTON' && !e.target.classList.contains('chosen')) {
        e.target.classList.add("chosen");
        e.target.disabled=true;
        let letterFound = checkLetter(e.target);
        if (!letterFound) {
            missed++;
            const lostHeart = 5 - missed;
            hearts[lostHeart].setAttribute("src","images/lostHeart.png");
        }
    }
    checkWin();
});

function resetGame() {
    //reset hearts
    const lostHeart = 5 - missed;
    for (let i =4; i>=lostHeart; i--) {
        hearts[i].setAttribute("src","images/liveHeart.png");
    }
    //reset overlay
    if (missed >= 5) {
        overlay.classList.remove("lose");
    } else if (letter.length === show.length) {
        overlay.classList.remove("win");
    }
    //set missed to zero
    missed = 0;
    //recreate keyboard
    const chosenButtons = document.querySelectorAll(".chosen");
    for (let i = 0; i < chosenButtons.length; i++) {
        chosenButtons[i].disabled = false;
        chosenButtons[i].classList.remove("chosen");
    }
    //generate new phrase
    while (phrase.firstChild) {
        phrase.removeChild(phrase.lastChild);
    }
    phraseArray = getRandomPhraseAsArray(phrases);
    addPhraseToDisplay(phraseArray);

}


let phraseArray = getRandomPhraseAsArray(phrases);
addPhraseToDisplay(phraseArray);