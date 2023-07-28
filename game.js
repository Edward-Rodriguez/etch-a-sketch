const containerDiv = document.querySelector('#container');
let gridSize = 32;

function generateSquareGrid(n) {
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      const pixelDiv = document.createElement('div');
      pixelDiv.style.width = `${calculateDimensions(n)}%`;
      pixelDiv.style.height = `${calculateDimensions(n)}%`;
      containerDiv.appendChild(pixelDiv);
    }
  }
}

function calculateDimensions(n) {
  return (1 / n) * 100;
}

function setPixelDivsEventListener() {
  const pixelDivs = document.querySelectorAll('#container div');
  pixelDivs.forEach((pixelDiv) => {
    pixelDiv.addEventListener('mouseover', () => {
      pixelDiv.classList.add('hovered');
    });
  });
}

const changeGridSizeButton = document.querySelector('#grid-size-btn');
changeGridSizeButton.addEventListener('click', () => {
  gridSize = getUserInput();
  if (gridSize > 0) {
    containerDiv.replaceChildren();
    generateSquareGrid(gridSize);
    setPixelDivsEventListener();
    // styleCornerPixelDivs();
  }
});

function getUserInput() {
  let userInput = prompt(
    'Please choose a value for n between 1 and 100, for a grid size (n x n)'
  );
  if (isNull(userInput)) return -1;
  else if (isValidInput(userInput)) return +userInput;
  else {
    while (!isValidInput(userInput)) {
      userInput = prompt('Enter a valid value between 1 and 100');
    }
  }
  return +userInput;
}

function isValidInput(input) {
  if (isNull(input)) return true;
  input = parseInt(input);
  if (isNaN(input) || !(input >= 1 && input <= 100)) return false;
  else return true;
}

function isNull(input) {
  if (input === null || input === '') return true;
  else return false;
}

function styleCornerPixelDivs() {
  let n = gridSize;
  const leftChildNum = n * n - (n - 1);
  const leftBottomPixelDiv = document.querySelector(
    `#container :nth-child(${leftChildNum})`
  );
  leftBottomPixelDiv.classList.add('left-corner-pixel');
  const rightBottomPixelDiv = document.querySelector(
    `#container :nth-child(${n * n})`
  );
  rightBottomPixelDiv.classList.add('right-corner-pixel');
}

generateSquareGrid(gridSize);
// styleCornerPixelDivs();
setPixelDivsEventListener();
