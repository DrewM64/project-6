const qwerty = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
const buttonReset = document.getElementsByClassName('btn__reset')[0];
let missed = 0;
const phrases = ["eat hot chip", 'go tuck yourself in', 'rubber babies', 'hey arnold', 'the things i do for love'];

buttonReset.addEventListener('click', () => {
    const overlay = document.getElementById('overlay');
    overlay.style.display = "none";
    });

