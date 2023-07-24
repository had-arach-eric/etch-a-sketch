//References to DOM nodes
const bodyUI = document.querySelector("body");
const boardUI = document.querySelector("#board-container");
const buttonsSizeUI = document.querySelectorAll(".button-size");
const buttonStaticColorUI = document.querySelector("#button-static-color");

let mode = "static";
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

function handlePrintCells(e) {
  if (mode === "static") {
    e.target.style.backgroundColor = buttonStaticColorUI.value;
  }
  
  
} 

function handleClickOnBoard(e) {
  if (!clickPrint) {
    clickPrint = true;
    if (mode === "static") {
      for (let i = 0; i < boardUI.children.length; i++) {
        boardUI.children[i].addEventListener("pointerover", handlePrintCells);
      }
    }
  }
  else {
    clickPrint = false;
    if (mode === "static") {
      for (let i = 0; i < boardUI.children.length; i++) {
        boardUI.children[i].removeEventListener("pointerover", handlePrintCells);
      }
    }
  }
}




function playGame() {

  addListenersToSizeButtons();
  boardUI.addEventListener("click", handleClickOnBoard);

}

playGame();

