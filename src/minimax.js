import { checkWinner } from "./checkWinner.js";

export function minimax(boardState, playerTurn) {
  let _boardState = boardState;
  let gameState = checkWinner(_boardState);

  if (gameState.gameover) {
    if (gameState.winner === "X") {
      return -1;
    } else if (gameState.winner === "O") {
      return 1;
    } else {
      return 0;
    }
  }

  if (playerTurn) {
    // minimise for player
    let score = 100;
    for (let i = 0; i < _boardState.length; i++) {
      if (_boardState[i] !== " ") continue;
      _boardState[i] = "X";
      score = Math.min(score, minimax(_boardState, !playerTurn));
      _boardState[i] = " ";
    }
    return score;
  } else {
    // maximise for computer
    let score = -100;
    for (let i = 0; i < _boardState.length; i++) {
      if (_boardState[i] !== " ") continue;
      _boardState[i] = "O";
      score = Math.max(score, minimax(_boardState, !playerTurn));
      _boardState[i] = " ";
    }
    return score;
  }
}
