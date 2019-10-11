// SELECTOR
const square = document.querySelectorAll('.case');
const symbol = document.querySelector('.turn');
const resetButton = document.querySelector('#reset');
const continueButton = document.querySelector('#continue');
const scoreX = document.querySelector('.scoreX');
const scoreY = document.querySelector('.scoreY');

// EVENTS
square.forEach(el => el.addEventListener('click', click));
resetButton.addEventListener('click', reset);
continueButton.addEventListener('click', continueGame);

// VARIABLES
let turn = 0;
let playerX = [];
let playerO = [];
let scorePlayerX = localStorage.getItem('scorePlayerX') || 0;
let scorePlayerY = localStorage.getItem('scorePlayerY') || 0;
let isDone = false;

// CONSTANTS
const combinations = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7]
];
const circle = `
  <img 
    src="img/circle-outline.svg" 
    alt="circle" 
    width="50rem"
  />`;
const cross = `
  <img 
    src="img/close.svg" 
    alt="close" 
    width="50rem"
  />`;

// DOM
symbol.innerHTML = `C'est à ${cross} de jouer`;
scoreX.innerHTML = `${cross} ${scorePlayerX}`;
scoreY.innerHTML = `${circle} ${scorePlayerY}`;

// FUNCTIONS
function click() {
  if (isDone) return;

  if (turn % 2) {
    if (this.innerHTML !== '') return;
    playerO.push(parseInt(this.id));
    this.innerHTML = circle;
    symbol.innerHTML = `C'est à ${cross} de jouer`;
    turn++;
  } else {
    if (this.innerHTML !== '') return;
    playerX.push(parseInt(this.id));
    this.innerHTML = cross;
    symbol.innerHTML = `C'est à ${circle} de jouer`;
    turn++;
  }
  checkWin();
}

function ifWin(playerSymbol, playerScore, scoreCount, index) {
  symbol.innerHTML = `${playerSymbol} a gagné !`;
  scoreCount.innerHTML = `${playerSymbol} ${playerScore}`;
  isDone = true;
  resetButton.classList.remove('hidden');
  continueButton.classList.remove('hidden');
  square[combinations[index][0] - 1].style.backgroundColor = 'salmon';
  square[combinations[index][1] - 1].style.backgroundColor = 'salmon';
  square[combinations[index][2] - 1].style.backgroundColor = 'salmon';
}

function checkWin() {
  for (let i = 0; i < combinations.length; i++) {
    if (
      playerX.includes(combinations[i][0]) &&
      playerX.includes(combinations[i][1]) &&
      playerX.includes(combinations[i][2])
    ) {
      scorePlayerX++;
      localStorage.setItem('scorePlayerX', scorePlayerX);
      ifWin(cross, scorePlayerX, scoreX, i);
      localStorage.setItem('scorePlayerX', scorePlayerX);
    } else if (
      playerO.includes(combinations[i][0]) &&
      playerO.includes(combinations[i][1]) &&
      playerO.includes(combinations[i][2])
    ) {
      scorePlayerY++;
      ifWin(circle, scorePlayerY, scoreY, i);
    } else if (playerX.length === 5 || playerO.length === 5) {
      symbol.innerHTML = `${circle} ${cross} Match nul !`;
      isDone = true;
      resetButton.classList.remove('hidden');
      continueButton.classList.remove('hidden');
    }
  }
}

function continueGame() {
  turn = 0;
  playerX = [];
  playerO = [];
  symbol.innerHTML = `C'est à ${cross} de jouer`;
  square.forEach(el => el.innerHTML = '');
  isDone = false;
  continueButton.classList.add('hidden');
  square.forEach(el => el.style.backgroundColor = 'rgba(89, 207, 187, 0.2)');
}

function reset() {
  continueGame();
  scorePlayerX = 0;
  scorePlayerY = 0;
  scoreX.innerHTML = `${cross} 0`;
  scoreY.innerHTML = `${circle} 0`;
  localStorage.removeItem('scorePlayerX');
  localStorage.removeItem('scorePlayerY');
}
