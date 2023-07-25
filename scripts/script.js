//-----------References to DOM nodes-----------
const referencesToDOMNodes = {
  
}
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
}

function handlePressHideLine() {
  if (currentSize !== 0) {
    if (visibleLines) {
      visibleLines = false;
      buttonHideLines.textContent = "Show lines";
      for (let i = 0; i < boardUI.children.length; i++) {
        boardUI.children[i].style.border = "0px";
      }
    }
    else {
      visibleLines = true;
      buttonHideLines.textContent = "Hide lines";
      for (let i = 0; i < boardUI.children.length; i++) {
        boardUI.children[i].style.border = "1px solid rgb(202, 202, 202)";
      }
    }
    
  }
}

function handleClickOnBoard(e) {
  if (!clickPrint) {
    clickPrint = true;
    if (mode === "static") {
      for (let i = 0; i < boardUI.children.length; i++) {
        boardUI.children[i].addEventListener("pointerover", handlePrintStatic);
      }
    }
    else if (mode === "rainbow") {
      for (let i = 0; i < boardUI.children.length; i++) {
        boardUI.children[i].addEventListener("pointerover", handlePrintRainbow);
      }
    }
    else if (mode === "eraser") {
      for (let i = 0; i < boardUI.children.length; i++) {
        boardUI.children[i].addEventListener("pointerover", handlePrintEraser);
      }
    }
  }
  else {
    clickPrint = false;
    if (mode === "static") {
      for (let i = 0; i < boardUI.children.length; i++) {
        boardUI.children[i].removeEventListener("pointerover", handlePrintStatic);
      }
    }
    else if (mode === "rainbow") {
      for (let i = 0; i < boardUI.children.length; i++) {
        boardUI.children[i].removeEventListener("pointerover", handlePrintRainbow);
      }
    }
    else if (mode === "eraser") {
      for (let i = 0; i < boardUI.children.length; i++) {
        boardUI.children[i].removeEventListener("pointerover", handlePrintEraser);
      }
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

  buttonHideLines.addEventListener("click", handlePressHideLine);
}


playGame();
