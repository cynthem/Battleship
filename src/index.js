const gameplay = require('./modules/gameplay');

const startInput = document.querySelector('.welcome-input');
const startForm = document.querySelector('.welcome-name');
const playerName = document.querySelector('.player-name');
const compName = document.querySelector('.computer-name');
const welcomeMsg = document.querySelector('.welcome');
const gameText = document.querySelector('.gameplay-text');

startForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const inputName = startInput.value;
    playerName.textContent = inputName;
    playerName.classList.remove('invisible'); 
    compName.classList.remove('invisible'); 
    welcomeMsg.classList.add('hide');
    playerName.value = '';
    window.setTimeout(() => {
        gameText.classList.remove('hide');
        gameplay.beginGame(inputName, 'computer');
    }, '1000');
});