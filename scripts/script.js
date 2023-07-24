//References to DOM nodes
const bodyUI = document.querySelector("body");
const boardUI = document.querySelector("#board-container");
const buttonsSizeUI = document.querySelectorAll(".button-size");
const buttonStaticColorUI = document.querySelector("#button-static-color");
const inputStaticColorUI = document.querySelector("#button-background-color");
const buttonRainbowUI = document.querySelector("#button-rainbow");
//const buttonRainbowUI = document.querySelector("#button-rainbow");

let mode = "darknees";
let clickPrint = false;



function setNewBoard(boardUI, size) {
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

function handlePrintStatic(e) {
  mode = "static";
  e.target.style.backgroundColor = buttonStaticColorUI.value;
} 

function handlePrintRainbow(e) {
  mode = "rainbow";
  e.target.style.backgroundColor = `rgb(${Math.round((Math.random() * 255))} ${Math.round((Math.random() * 255))} ${Math.round((Math.random() * 255))}`;
}

function handleClickOnBoard(e) {
  if (!clickPrint) {
    clickPrint = true;
    if (mode === "static") {
      for (let i = 0; i < boardUI.children.length; i++) {
        boardUI.children[i].addEventListener("pointerover", handlePrintStatic);
      }
    }
    if (mode === "rainbow") {
      for (let i = 0; i < boardUI.children.length; i++) {
        boardUI.children[i].addEventListener("pointerover", handlePrintRainbow);
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
    if (mode === "rainbow") {
      for (let i = 0; i < boardUI.children.length; i++) {
        boardUI.children[i].removeEventListener("pointerover", handlePrintRainbow);
      }
    }
  }
}




function playGame() {

  addListenersToSizeButtons();

  boardUI.addEventListener("click", handleClickOnBoard);
  
  inputStaticColorUI.addEventListener("input", () => {
    boardUI.style.backgroundColor = inputStaticColorUI.value;
  });

  buttonRainbowUI.addEventListener("click", handlePrintRainbow);

  

}



playGame();

