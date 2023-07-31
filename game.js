const containerDiv = document.querySelector('#container');
let gridSize = 32;
let rgbColor = {
  red: 0,
  green: 0,
  blue: 0,
};
let rgbIsActive = false;

function generateSquareGrid(n) {
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      const pixelDiv = document.createElement('div');
      pixelDiv.classList.add('pixel-div');
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
      // pixelDiv.classList.add('hovered');
      changeBackgroundColor(pixelDiv);
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

const rgbButton = document.querySelector('#rgb-btn');
rgbButton.addEventListener('click', () => {
  rgbIsActive ? (rgbIsActive = false) : (rgbIsActive = true);
});

const clearButton = document.querySelector('#clr-btn');
clearButton.addEventListener('click', () => {
  containerDiv.replaceChildren();
  generateSquareGrid(gridSize);
  setPixelDivsEventListener();
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

function randomizeColor() {
  rgbColor.red = getRandomInt(255);
  rgbColor.green = getRandomInt(255);
  rgbColor.blue = getRandomInt(255);
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max + 1);
}

function changeBackgroundColor(element) {
  if (rgbIsActive) {
    randomizeColor();
    element.style.backgroundColor = `rgb(${rgbColor.red},${rgbColor.blue},${rgbColor.green})`;
  } else {
    element.style.backgroundColor = 'black';
  }
}

generateSquareGrid(gridSize);
// styleCornerPixelDivs();
setPixelDivsEventListener();
