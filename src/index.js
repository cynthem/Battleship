const startInput = document.querySelector('.welcome-input');
const startBtn = document.querySelector('.welcome-btn');
const playerName = document.querySelector('.player-name');
const compName = document.querySelector('.computer-name');
const welcomeMsg = document.querySelector('.welcome');
const gameText = document.querySelector('.gameplay-text');

startBtn.addEventListener('click', (e) => {
    e.preventDefault();
    playerName.textContent = startInput.value;
    playerName.classList.remove('invisible'); 
    compName.classList.remove('invisible'); 
    welcomeMsg.classList.add('hide');
    playerName.value = '';
    gameText.classList.remove('hide');
});


