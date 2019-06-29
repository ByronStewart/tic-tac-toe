function checkWinner(state) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (state[a] === " ") continue;
    if (state[a] === state[b] && state[a] === state[c]) {
      return {
        gameover: true,
        winner: state[a]
      };
    }
  }
  for (let i = 0; i < state.length; i++) {
    if (state[i] === " ") {
      return {
        gameover: false,
        winner: "no winner"
      };
    }
  }
  return {
    gameover: true,
    winner: "no winner"
  };
}

function minimax(boardState, playerTurn) {
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

function getBestMove(boardState, playerTurn) {
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
