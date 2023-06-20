import "./App.scss";
import Board from "../Board/Board";
import { useState } from "react";
import ScoreBoard from "../ScoreBoard/ScoreBoard";
import ResetBtn from "../ResetBtn/ResetBtn";

function App() {
  const WIN_CONDITIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const [board, setBoard] = useState(Array(9).fill(null));
  const [xPlaying, setXPlaying] = useState(true);
  const [gameOver, setGameOver] = useState(false);
  const [scores, setScores] = useState({ xScore: 0, oScore: 0, winner: "" });

  const handleBoxClick = (boxIndex) => {
    const updatedBoard = board.map((value, i) => {
      if (i === boxIndex) {
        return xPlaying ? "X" : "O";
      } else {
        return value;
      }
    });

    const winner = checkWinner(updatedBoard);

    if (winner) {
      if (winner === "O") {
        setScores((prev) => ({ ...prev, oScore: prev.oScore++, winner: "O" }));
      } else {
        setScores((prev) => ({ ...prev, xScore: prev.xScore++, winner: "X" }));
      }
      setGameOver(true);
    }

    setXPlaying((prev) => !prev);
    setBoard(updatedBoard);
  };

  const checkWinner = (board) => {
    for (let i = 0; i < WIN_CONDITIONS.length; i++) {
      const [x, y, z] = WIN_CONDITIONS[i];

      if (board[x] && board[x] === board[y] && board[y] === board[z]) {
        return board[x];
      }
    }
  };

  const resetGame = () => {
    setGameOver(false);
    setBoard(Array(9).fill(null));
  };

  return (
    <div className="app">
      <ScoreBoard scores={scores} xPlaying={xPlaying} />
      <Board board={board} onClick={!gameOver ? handleBoxClick : () => {}} />
      {gameOver && (
        <div
          className={`winnerMessage ${scores.winner === "X" ? "XWon" : "OWon"}`}
        >
          {scores.winner} has won!
        </div>
      )}
      <ResetBtn onClick={resetGame} />
    </div>
  );
}

export default App;
