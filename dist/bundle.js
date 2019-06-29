(function () {
  'use strict';

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
    for (let i = 0; i < 9; i++) {
      boardState[i] = " ";
      squares[i].innerText = " ";
    }
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

}());
