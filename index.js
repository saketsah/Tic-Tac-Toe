const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");

let currentPlayer;
let gameGrid;

const winningPostions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function initGame() {
  currentPlayer = "X";
  gameGrid = ["", "", "", "", "", "", "", "", ""];
  boxes.forEach((box, index) => {
    box.innerText = "";
    boxes[index].style.pointerEvents = "all";
    box.classList = `box box${index + 1}`;
  });
  newGameBtn.classList.remove("active");
  gameInfo.innerText = `Current Player - ${currentPlayer}`;
}
initGame();

boxes.forEach((box, index) => {
  box.addEventListener("click", () => {
    handleClick(index);
  });
});

function handleClick(index) {
  if (gameGrid[index] === "") {
    boxes[index].innerText = currentPlayer;
    gameGrid[index] = currentPlayer;
    boxes[index].style.pointerEvents = "none";
    //swap
    swapTurn();
    //check game win or not
    checkGameOver();
  }
}

function swapTurn() {
  if (currentPlayer === "X") currentPlayer = "O";
  else {
    currentPlayer = "X";
  }
  gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

function checkGameOver() {
  let answer = "";
  winningPostions.forEach((position) => {
    if (
      (gameGrid[position[0]] !== "" ||
        gameGrid[position[1]] !== "" ||
        gameGrid[position[2]] !== "") &&
      gameGrid[position[0]] === gameGrid[position[1]] &&
      gameGrid[position[1]] === gameGrid[position[2]]
    ) {
      //check if X win
      if (gameGrid[position[0]] === "X") answer = "X";
      else answer = "O";
      boxes.forEach((box) => {
        box.style.pointerEvents = "none";
      });
      boxes[position[0]].classList.add("win");
      boxes[position[1]].classList.add("win");
      boxes[position[2]].classList.add("win");
    }
  });
  if (answer !== "") {
    gameInfo.innerText = `Winner is ${answer}`;
    newGameBtn.classList.add("active");
    return;
  }
  let fillCount = 0;
  gameGrid.forEach((box) => {
    if (box !== "") fillCount++;
  });
  if (fillCount === 9) {
    gameInfo.innerText = "Game Tie!";
    newGameBtn.classList.add("active");
  }
}

newGameBtn.addEventListener("click", initGame);
