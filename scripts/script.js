function setNewBoard(boardUI, size) {
  boardUI.dataset.size = size.toString();;
  boardUI.innerHTML = null;
  boardUI.style.gridTemplate = `repeat(${size}, 1fr) / repeat(${size}, 1fr)`;

  for (let i = 0; i < size * size; i++) {
    const cellUI = document.createElement("div");
    boardUI.appendChild(cellUI);
  }

}

function addListenersToSizeButtons(buttonsSizeUI, boardUI) {
  for (let i = 0; i < buttonsSizeUI.length; i++) {
    buttonsSizeUI[i].addEventListener("click", e => {
      setNewBoard(boardUI, Number(buttonsSizeUI[i].dataset.size));
    })
  }
}




function playGame() {

  let mode = "static";
  let activeBrushButton; // almaceno el botón que va a estar activo
  let clickPrint = { active: false };
  

  //References to DOM nodes
  const bodyUI = document.querySelector("body");
  const boardUI = document.querySelector("#board-container");
  const buttonsSizeUI = document.querySelectorAll(".button-size");

  addListenersToSizeButtons(buttonsSizeUI, boardUI);

  const handlePrintStaticColor = e => e.target.style.backgroundColor = "black";

  const handleClickOnBoard = e => {
    if (!clickPrint.active) {
      clickPrint.active = true;
      for (let i = 0; i < boardUI.children.length; i++) {
        boardUI.children[i].addEventListener("pointerover", handlePrintStaticColor);
      }
    }
    else {
      clickPrint.active = false;
      for (let i = 0; i < boardUI.children.length; i++) {
        boardUI.children[i].removeEventListener("pointerover", handlePrintStaticColor);
      }
    }
  }

  boardUI.addEventListener("click", handleClickOnBoard);












}

playGame();

