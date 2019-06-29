import { checkWinner } from "./checkWinner.js";
import { getBestMove } from "./getBestMove.js";

let boardState = Array(9);
let playerTurn = true;
let gameState = {
  gameover: false,
  winner: "no winner"
};

const squares = document.querySelectorAll(".item");
squares.forEach((el) => {
  el.addEventListener("click", turn);
});
const resetBtn = document.querySelector("#reset");
resetBtn.addEventListener("click", reset);
const computerTurnBtn = document.querySelector("#computer-turn");
computerTurnBtn.addEventListener("click", () => {
  const bestMove = getBestMove(boardState, playerTurn);
  if (bestMove.score < -1) {
    console.log("it is your turn");
    return;
  }
  const square = document.getElementById(bestMove.square);
  square.innerText = "O";
  boardState[bestMove.square] = "O";
  playerTurn = !playerTurn;
});

function reset() {
  setup();
  gameState = {
    gameover: false,
    winner: "no winner"
  };
  playerTurn = true;
}

function setup() {
  for (let i = 0; i < 9; i++) {
    boardState[i] = " ";
    squares[i].innerText = " ";
  }
}
function announceWinner() {
  const div = document.createElement("div");
  const h1 = document.createElement("h1");
  h1.innerText = `The winner is... ${gameState.winner}`;
  div.appendChild(h1);
  document.body.appendChild(div);
}

function turn(e) {
  console.log(`innertext: ${e.target.innerText}, id: ${e.target.id}`);
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
