const qwerty = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
const overlay = document.getElementById('overlay');
const heading = overlay.getElementsByTagName("h2")[0];
const buttonReset = document.getElementsByClassName('btn__reset')[0];
let missed = 0;
const scoreboard = document.getElementById("scoreboard").firstElementChild;
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
    const letter = document.getElementsByClassName("letter");
    let show = document.getElementsByClassName("show");

    if (letter.length === show.length) {
        overlay.classList.add("win");
        heading.textContent = "Congrats, you won!"
        overlay.style.display = "flex";
    } else if (missed >= 5) {
        overlay.classList.add("lose");
        heading.textContent = "You lose..."
        overlay.style.display = "flex";
    }
}

//listen for the "Start Game" button to be clicked
buttonReset.addEventListener('click', () => {
    overlay.style.display = "none";
    //if (buttonReset.textContent === "")
    });

//listen for onscreen keyboard clicks
qwerty.addEventListener("click", (e) => {
    if (e.target.tagName === 'BUTTON' && !e.target.classList.contains('chosen')) {
        e.target.classList.add("chosen");
        e.target.disabled=true;
        let letterFound = checkLetter(e.target);
        if (!letterFound) {
            scoreboard.removeChild(scoreboard.lastElementChild);
            missed++;
        }
    }
    checkWin();
});



const phraseArray = getRandomPhraseAsArray(phrases);
addPhraseToDisplay(phraseArray);