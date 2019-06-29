export function checkWinner(state) {
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
