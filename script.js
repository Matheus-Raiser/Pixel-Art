const idColorPalette = document.getElementById('color-palette');
const classColors = document.getElementsByClassName('color');
const classPixel = document.getElementsByClassName('pixel');
const defBoardsize = localStorage.boardSize;

const saveDrawn = () => {
  const drawn = [];
  for (let i = 0; i < classPixel.length; i += 1) {
    drawn[i] = classPixel[i].style.backgroundColor;
  }

  localStorage.pixelBoard = JSON.stringify(drawn);
};

function reciveItemSelected() {
  const selectedColor = document.getElementsByClassName('selected')[0].style.backgroundColor;
  localStorage.selectedColor = selectedColor;
}

const addSelected = (origem) => {
  for (let i = 0; i < classColors.length; i += 1) {
    if (classColors[i] === origem.target) {
      origem.target.classList.add('selected');
    } else {
      classColors[i].classList.remove('selected');
    }
  }

  reciveItemSelected();
};

const addClassColorListener = () => {
  for (let i = 0; i < classColors.length; i += 1) {
    classColors[i].addEventListener('click', addSelected);
  }
};

const changePixelColor = (event) => {
  const itemSelected = document.getElementsByClassName('selected')[0];
  const correcaoDoBugLint = event.target;
  correcaoDoBugLint.style.backgroundColor = itemSelected.style.backgroundColor;
  saveDrawn();
};

const addClassPixelListener = () => {
  for (let i = 0; i < classPixel.length; i += 1) {
    classPixel[i].addEventListener('click', changePixelColor);
  }
};

const loadDrawn = () => {
  for (let i = 0; i < classPixel.length; i += 1) {
    const drawn = JSON.parse(localStorage.pixelBoard);
    classPixel[i].style.backgroundColor = drawn[i];
  }
};

function recebeCores() {
  const arrayColors = [];

  for (let i = 0; i < idColorPalette.children.length; i += 1) {
    arrayColors[i] = idColorPalette.children[i].style.backgroundColor;
  }

  return JSON.stringify(arrayColors);
}

function savePalletColor() {
  for (let i = 0; i < idColorPalette.children.length; i += 1) {
    localStorage.colorPalette = recebeCores();
  }
}

const generateColor = () => {
  const hexa = '0123456789ABCDEF';
  let color = '';
  for (let i = 0; i < 6; i += 1) {
    color += hexa[Math.floor(Math.random() * 16)];
  }
  return `#${color}`;
};

const createPallet = () => {
  for (let i = 0; i < 8; i += 1) {
    const newColor = document.createElement('div');

    newColor.classList.add('color');

    if (i === 0) {
      newColor.style.backgroundColor = 'black';
      newColor.classList.add('selected');
    } else if (i === 1) {
        newColor.style.backgroundColor = 'white';
        newColor.classList.add('selected');
    } else {
      newColor.style.backgroundColor = generateColor();
    }
    idColorPalette.appendChild(newColor);

    savePalletColor();
  }
};

const generatePallet = () => {
  if (localStorage.getItem('colorPalette') === null) {
    createPallet();
  } else {
    for (let i = 0; i < 8; i += 1) {
      const newColor = document.createElement('div');
      const localPallet = JSON.parse(localStorage.getItem('colorPalette'));

      newColor.classList.add('color');

      newColor.style.backgroundColor = localPallet[i];

      idColorPalette.appendChild(newColor);
    }
  }
};

generatePallet();

const addSelectedToPallet = () => {
  for (let i = 0; i < classColors.length; i += 1) {
    if (classColors[i].style.backgroundColor === localStorage.selectedColor) {
      classColors[i].classList.add('selected');
    }
  }
};

addSelectedToPallet();

const bntRandomColor = document.getElementById('button-random-color');

const changeColorPallet = () => {
  for (let i = 0; i < classColors.length; i += 1) {
    if (i === 0) {
      classColors[i].style.backgroundColor = 'black';
    } else if (i === 1) {
      classColors[i].style.backgroundColor = 'white';
    }else {
      classColors[i].style.backgroundColor = generateColor();
    }
  }
  savePalletColor();
};

bntRandomColor.addEventListener('click', changeColorPallet);

//  Pixel board;

const idPixelBoard = document.getElementById('pixel-board');
const classBoardRow = document.getElementsByClassName('board-row');

const createPixelBoard = (width, height) => {
  for (let i = 0; i < height; i += 1) {
    const newRow = document.createElement('div');
    newRow.classList.add('board-row');
    idPixelBoard.appendChild(newRow);
  }

  for (let i = 0; i < classBoardRow.length; i += 1) {
    for (let j = 0; j < width; j += 1) {
      const newPixel = document.createElement('div');
      newPixel.classList.add('pixel');
      newPixel.style.backgroundColor = 'white';
      classBoardRow[i].appendChild(newPixel);
    }
  }
  addClassPixelListener();
};

const removePixelBoard = () => {
  for (let i = 0; i < classBoardRow.length;) {
    classBoardRow[0].remove();
  }
};

const idBoardSize = document.getElementById('board-size');
const generateBoard = document.getElementById('generate-board');
let boardSize = 5;

const verifyLocalBoardSize = () => {
  if (typeof defBoardsize !== 'undefined') {
    boardSize = defBoardsize;
  }
};

const verifyBoardSize = (size) => {
  let newSize = size;
  if (size < 5) {
    newSize = 5;
  }
  if (size > 50) {
    newSize = 50;
  }
  return newSize;
};

verifyLocalBoardSize();

createPixelBoard(boardSize, boardSize);

const changeBoardSize = () => {
  if (idBoardSize.value > 0) {
    boardSize = idBoardSize.value;

    boardSize = verifyBoardSize(boardSize);

    localStorage.boardSize = boardSize;
    removePixelBoard();

    createPixelBoard(boardSize, boardSize);
    saveDrawn();
  } else {
    window.alert('Board inválido!');
  }
};

generateBoard.addEventListener('click', changeBoardSize);

if (typeof localStorage.pixelBoard !== 'undefined') {
  loadDrawn();
}

saveDrawn();

addClassColorListener();

const bntClearBoard = document.getElementById('clear-board');
bntClearBoard.addEventListener('click', () => {
  for (let i = 0; i < classPixel.length; i += 1) {
    classPixel[i].style.backgroundColor = 'white';
  }
  saveDrawn();
});
