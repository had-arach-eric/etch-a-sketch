//-----------References to DOM nodes-----------
const bodyUI = document.querySelector("body");
const boardUI = document.querySelector("#board-container");
const buttonsSizeUI = document.querySelectorAll(".button-size");
const inputStaticColorUI = document.querySelector("#button-static-color");
const inputBackgroundColorUI = document.querySelector("#button-background-color");
const buttonRainbowUI = document.querySelector("#button-rainbow");
const buttonEraserUI = document.querySelector("#button-eraser");
const buttonClearUI = document.querySelector("#button-clear-grid");
const buttonHideLines = document.querySelector("#button-hide-lines");

//-----------Global variables-----------
let currentSize = 0;
let mode = "static";
let clickPrint = false;
let visibleLines = true;


//-----------Functions-----------
function setNewBoard(boardUI, size) {
  currentSize = size;
  boardUI.dataset.size = size.toString();;
  boardUI.innerHTML = null;
  boardUI.style.gridTemplate = `repeat(${size}, 1fr) / repeat(${size}, 1fr)`;

  for (let i = 0; i < size * size; i++) {
    const cellUI = document.createElement("div");
    boardUI.appendChild(cellUI);
  }
  showLines();

}

function addListenersToSizeButtons() {
  for (let i = 0; i < buttonsSizeUI.length; i++) {
    buttonsSizeUI[i].addEventListener("click", e => {
      setNewBoard(boardUI, Number(buttonsSizeUI[i].dataset.size));
    })
  }
}

function handlePressStaticColor() {
  mode = "static";
}

function handlePrintStatic(e) {
  e.target.style.backgroundColor = inputStaticColorUI.value;
} 

function handlePressRainbow() {
  mode = "rainbow";
}

function handlePrintRainbow(e) {
  e.target.style.backgroundColor = `rgb(${Math.round((Math.random() * 255))} ${Math.round((Math.random() * 255))} ${Math.round((Math.random() * 255))}`;
}

function handlePressEraser() {
  mode = "eraser";
}

function handlePrintEraser(e) {
  e.target.style.backgroundColor = inputBackgroundColorUI.value;
}

function handlePressClear() {
  setNewBoard(boardUI, currentSize);
  showLines();
}

function showLines() {
  visibleLines = true;
  buttonHideLines.textContent = "Hide lines";
  for (let i = 0; i < boardUI.children.length; i++) {
    boardUI.children[i].style.border = "1px solid rgb(202, 202, 202)";
  }
}

function hideLines() {
  visibleLines = false;
  buttonHideLines.textContent = "Show lines";
  for (let i = 0; i < boardUI.children.length; i++) {
    boardUI.children[i].style.border = "0px";
  }
}

function handlePressLines() {
  if (currentSize !== 0) {
    if (visibleLines) {
      hideLines();
    }
    else {
      showLines();
    }
  }
}

function setStaticMode() {
  for (let i = 0; i < boardUI.children.length; i++) {
    boardUI.children[i].addEventListener("pointerover", handlePrintStatic);
  }
}

function unsetStaticMode() {
  for (let i = 0; i < boardUI.children.length; i++) {
    boardUI.children[i].removeEventListener("pointerover", handlePrintStatic);
  }
}

function setRainbowMode() {
  for (let i = 0; i < boardUI.children.length; i++) {
    boardUI.children[i].addEventListener("pointerover", handlePrintRainbow);
  }
}

function unsetRainbowMode() {
  for (let i = 0; i < boardUI.children.length; i++) {
    boardUI.children[i].removeEventListener("pointerover", handlePrintRainbow);
  }
}

function setEraserMode() {
  for (let i = 0; i < boardUI.children.length; i++) {
    boardUI.children[i].addEventListener("pointerover", handlePrintEraser);
  }
}

function unsetEraserMode() {
  for (let i = 0; i < boardUI.children.length; i++) {
    boardUI.children[i].removeEventListener("pointerover", handlePrintEraser);
  }
}

function handleClickOnBoard(e) {
  if (!clickPrint) {
    clickPrint = true;
    if (mode === "static") {
      setStaticMode();
    }
    else if (mode === "rainbow") {
      setRainbowMode();
    }
    else if (mode === "eraser") {
      setEraserMode();
    }
  }
  else {
    clickPrint = false;
    if (mode === "static") {
      unsetStaticMode();
    }
    else if (mode === "rainbow") {
      unsetRainbowMode();
    }
    else if (mode === "eraser") {
      unsetEraserMode();
    }
  }
}

function playGame() {

  addListenersToSizeButtons();

  boardUI.addEventListener("click", handleClickOnBoard);
  
  inputBackgroundColorUI.addEventListener("input", () => {
    boardUI.style.backgroundColor = inputBackgroundColorUI.value;
    console.log(inputBackgroundColorUI.value);
  });

  inputStaticColorUI.addEventListener("input", handlePressStaticColor);

  buttonRainbowUI.addEventListener("click", handlePressRainbow);

  buttonEraserUI.addEventListener("click", handlePressEraser);

  buttonClearUI.addEventListener("click", handlePressClear);

  buttonHideLines.addEventListener("click", handlePressLines);
}


playGame();
