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

/* PSEUDOCODIGO
  Crear referencia a la cuadrícula
  Crear cuadricula ante la presion de un botón de tamaño, si ya hay una cuadrícula se resetea
  Establecer que cuando se mantenga presionado el click sobre el body Y se pase el mouse por algún item se active un listener que pinte de negro el item
  Establecer que cuando se suelte el click se desactive el listener anterior.
*/

  const bodyUI = document.querySelector("body");
  const boardUI = document.querySelector("#board-container");
  const buttonsSizeUI = document.querySelectorAll(".button-size");

  for (let i = 0; i < buttonsSizeUI.length; i++) {
    buttonsSizeUI[i].addEventListener("click", e => {
      setNewBoard(boardUI, Number(buttonsSizeUI[i].dataset.size));
    })
  }
  
  //setNewBoard(boardUI, 16);

 
  


}

playGame();

