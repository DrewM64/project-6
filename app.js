const qwerty = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
const overlay = document.getElementById('overlay');
const buttonReset = document.getElementsByClassName('btn__reset')[0];
let missed = 0;
const phrases = ["eat hot chip", 'go tuck yourself in', 'rubber babies', 'hey arnold', 'the things i do for love'];

buttonReset.addEventListener('click', () => {
    overlay.style.display = "none";
    });

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
