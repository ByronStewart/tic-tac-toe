import { checkWinner } from "./checkWinner.js";
import { getBestMove } from "./getBestMove.js";

// state variables
let boardState = Array(9);
let playerTurn = false;
let gameState = {
  gameover: false,
  winner: "no winner"
};

// event listeners
const squares = document.querySelectorAll(".item");
squares.forEach((el) => {
  el.addEventListener("click", turn);
});
const resetBtn = document.querySelector("#reset");
resetBtn.addEventListener("click", reset);
const computerTurnBtn = document.querySelector("#computer-turn");
const select = document.querySelector("#select");
select.addEventListener("change", (e) => {
  if (e.target.value === "player") {
    playerTurn = true;
  } else {
    playerTurn = false;
  }
});

// Computer takes a turn
computerTurnBtn.addEventListener("click", () => {
  const bestMove = getBestMove(boardState, playerTurn);
  if (bestMove.score < -1) {
    alert("it is your turn");
    return;
  }
  const square = document.getElementById(bestMove.square);
  square.innerText = "O";
  boardState[bestMove.square] = "O";
  gameState = checkWinner(boardState);
  if (gameState.gameover) {
    announceWinner();
  }
  playerTurn = !playerTurn;
});

// resets the game state
function reset() {
  const selected = document.querySelector("#select");
  setup();
  gameState = {
    gameover: false,
    winner: "no winner"
  };
  if (selected.value === "player") {
    playerTurn = true;
  } else {
    playerTurn = false;
  }
}

// initialises an empty game state
function setup() {
  const notice = document.querySelector("#notice");
  for (let i = 0; i < 9; i++) {
    boardState[i] = " ";
    squares[i].innerText = " ";
  }
  notice.innerText = "";
}

// announces a winner to the dom
function announceWinner() {
  const notice = document.querySelector("#notice");
  if (gameState.winner === "X") {
    notice.innerText = "X is the winner!";
  } else if (gameState.winner === "O") {
    notice.innerText = "O is the winner!";
  } else {
    notice.innerText = "It's a draw!";
  }
}

function turn(e) {
  /* logic when a player takes a turn */
  if (gameState.gameover) return;
  if (e.target.textContent === " ") {
    if (playerTurn) {
      e.target.innerText = "X";
      boardState[e.target.id] = "X";
    } else {
      e.target.innerText = "O";
      boardState[e.target.id] = "O";
    }
    gameState = checkWinner(boardState);
    if (gameState.gameover) {
      announceWinner();
    }
    playerTurn = !playerTurn;
  }
}
setup();
