const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
let currentPlayer = "X";
let board = ["", "", "", "", "", "", "", "", ""];
let isGameOver = false;

const winCombos = [
  [0,1,2],[3,4,5],[6,7,8], // rows
  [0,3,6],[1,4,7],[2,5,8], // cols
  [0,4,8],[2,4,6]          // diagonals
];

function checkWin() {
  for (let combo of winCombos) {
    const [a,b,c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      isGameOver = true;
      statusText.textContent = `Player ${board[a]} wins!`;
      return;
    }
  }
  if (!board.includes("")) {
    isGameOver = true;
    statusText.textContent = "It's a draw!";
  }
}

function handleClick(e) {
  const index = e.target.dataset.index;
  if (board[index] !== "" || isGameOver) return;
  board[index] = currentPlayer;
  e.target.textContent = currentPlayer;
  checkWin();
  if (!isGameOver) {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `Player ${currentPlayer}'s turn`;
  }
}

function restartGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  isGameOver = false;
  currentPlayer = "X";
  cells.forEach(cell => cell.textContent = "");
  statusText.textContent = "Player X's turn";
}

cells.forEach(cell => cell.addEventListener("click", handleClick));
