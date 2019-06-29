import { minimax } from "./minimax.js";

export function getBestMove(boardState, playerTurn) {
  let _boardState = boardState;
  let bestMove = {
    score: -10,
    square: -1
  };
  if (!playerTurn) {
    for (let i = 0; i < _boardState.length; i++) {
      if (_boardState[i] !== " ") continue;
      _boardState[i] = "O";
      let moveScore = minimax(_boardState, !playerTurn);

      if (moveScore > bestMove.score) {
        bestMove.score = moveScore;
        bestMove.square = i;
      }
      _boardState[i] = " ";
    }
  }
  return bestMove;
}
