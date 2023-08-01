let gridSize = 16;
let rgbColor = {
  red: 0,
  green: 0,
  blue: 0,
};
let rgbIsActive = false;
let isPaused = false;

const containerDiv = document.querySelector('#container');
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
      if (isPaused)
        pixelDiv.style.backgroundColor = pixelDiv.style.backgroundColor;
      else {
        changeBackgroundColor(pixelDiv);
        // pixelDiv.setAttribute('data-');
      }
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
  if (rgbIsActive) {
    rgbIsActive = false;
    rgbButton.classList.remove('active');
  } else {
    rgbIsActive = true;
    rgbButton.classList.add('active');
  }
});

const clearButton = document.querySelector('#clr-btn');
clearButton.addEventListener('click', () => {
  containerDiv.replaceChildren();
  generateSquareGrid(gridSize);
  setPixelDivsEventListener();
});

// to allow user to 'pause' drawing on click
containerDiv.addEventListener('click', () => {
  togglePause();
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

function togglePause() {
  isPaused ? (isPaused = false) : (isPaused = true);
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
    if (
      element.style.backgroundColor === '' ||
      element.style.backgroundColor === 'rgb(0, 0, 0)'
    ) {
      randomizeColor();
      setOriginalBackgroundProperty(element);
    } else {
      darkenColor(element);
    }
    element.style.backgroundColor = `rgb(${rgbColor.red},${rgbColor.green},${rgbColor.blue})`;
  } else {
    element.style.backgroundColor = 'rgb(0, 0, 0)';
    setOriginalBackgroundProperty(element);
  }
}

// set custom property to store original rgb values (later used to calculate darkening)
function setOriginalBackgroundProperty(element) {
  element.style.setProperty(
    '--original-background-color',
    `rgb(${rgbColor.red},${rgbColor.green},${rgbColor.blue})`
  );
}

function darkenColor(element) {
  const currentBackgroundColor = element.style.backgroundColor;
  const currentBackgroundColorArray = currentBackgroundColor.match(/\d+/g);
  const originalBackgroungColor = element.style
    .getPropertyValue('--original-background-color')
    .match(/\d+/g);

  const updatedRedColor =
    currentBackgroundColorArray[0] -
    Math.floor(+originalBackgroungColor[0] * 0.1);
  const updatedGreenColor =
    currentBackgroundColorArray[1] -
    Math.floor(+originalBackgroungColor[1] * 0.1);
  const updatedBlueColor =
    currentBackgroundColorArray[2] -
    Math.floor(+originalBackgroungColor[2] * 0.1);

  rgbColor.red = updatedRedColor < 0 ? 0 : updatedRedColor;
  rgbColor.green = updatedGreenColor < 0 ? 0 : updatedGreenColor;
  rgbColor.blue = updatedBlueColor < 0 ? 0 : updatedBlueColor;
}

generateSquareGrid(gridSize);
setPixelDivsEventListener();
