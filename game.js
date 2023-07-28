const containerDiv = document.querySelector('#container');

function generateSquareGrid(n) {
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      const pixelDiv = document.createElement('div');
      pixelDiv.classList.add('border');
      pixelDiv.style.width = `${calculateDimensions(n)}%`;
      pixelDiv.style.height = `${calculateDimensions(n)}%`;
      containerDiv.appendChild(pixelDiv);
    }
  }
}

function calculateDimensions(n) {
  return (1 / n) * 100;
}

function setEventListeners() {
  const pixelDivs = document.querySelectorAll('#container div');
  pixelDivs.forEach((pixelDiv) => {
    pixelDiv.addEventListener('mouseover', () => {
      pixelDiv.classList.add('on-hover');
    });
  });
}

generateSquareGrid(128);
setEventListeners();
