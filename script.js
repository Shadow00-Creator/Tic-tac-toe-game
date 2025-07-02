const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
let currentPlayer = "X";
let board = ["", "", "", "", "", "", "", "", ""];
let isGameOver = false;
const clickX = document.getElementById("clickX");
const clickO = document.getElementById("clickO");

function startGame() {
  const name = document.getElementById("username").value;
  if (name.trim()) {
    document.getElementById("loginScreen").style.display = "none";
    document.getElementById("gameContainer").style.display = "block";
  }
}

function playClickSound(player) {
  if (player === "X") clickX.play();
  else clickO.play();
}

const winCombos = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
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

function cpuMove() {
  if (isGameOver) return;
  let emptyIndexes = board.map((val, idx) => val === "" ? idx : null).filter(x => x !== null);
  let move = emptyIndexes[Math.floor(Math.random() * emptyIndexes.length)];
  if (move !== undefined) {
    board[move] = "O";
    cells[move].textContent = "O";
    playClickSound("O");
    checkWin();
    if (!isGameOver) {
      currentPlayer = "X";
      statusText.textContent = `Player X's turn`;
    }
  }
}

function handleClick(e) {
  const index = e.target.dataset.index;
  if (board[index] !== "" || isGameOver) return;
  board[index] = currentPlayer;
  e.target.textContent = currentPlayer;
  playClickSound(currentPlayer);
  checkWin();
  if (!isGameOver) {
    if (document.getElementById("mode").value === "cpu" && currentPlayer === "X") {
      currentPlayer = "O";
      statusText.textContent = `Computer's turn`;
      setTimeout(cpuMove, 500);
    } else {
      currentPlayer = currentPlayer === "X" ? "O" : "X";
      statusText.textContent = `Player ${currentPlayer}'s turn`;
    }
  }
}

function restartGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  isGameOver = false;
  currentPlayer = "X";
  cells.forEach(cell => cell.textContent = "");
  statusText.textContent = "Player X's turn";
}

function changeTheme(theme) {
  if (theme === "classic") {
    document.body.style.backgroundColor = "#fff";
    document.body.style.color = "#000";
  } else {
    document.body.style.backgroundColor = "#0d0d0d";
    document.body.style.color = "#00ffea";
  }
}

cells.forEach(cell => cell.addEventListener("click", handleClick));
