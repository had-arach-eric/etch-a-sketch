



function setNewBoard(boardUI, size) {
  boardUI.dataset.size = size.toString();;
  boardUI.innerHTML = null;
  boardUI.style.gridTemplate = `repeat(${size}, 1fr) / repeat(${size}, 1fr)`;
  
  for (let i = 0; i < size*size; i++) {
    const cellUI = document.createElement("div");
    boardUI.appendChild(cellUI);
  }
}

function playGame() {
  const boardUI = document.querySelector(".board-container");
  const buttonsSizeUI = document.querySelectorAll(".container-buttons-size > button");
  for (let i = 0; i < buttonsSizeUI.length; i++) {
    buttonsSizeUI[i].addEventListener("click", e => {
      const size = Number(e.target.dataset.size);
      //console.log("se presiono");
      setNewBoard(boardUI, size);
    });
  }
  
  
}

playGame();

