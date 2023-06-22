import "./App.scss";
import gsap from "gsap";
import SplitText from "split-type";
import { useEffect, useRef, useState } from "react";
import { Player } from "@lottiefiles/react-lottie-player";

import Board from "../Board/Board";
import ResetBtn from "../ResetBtn/ResetBtn";
import ScoreBoard from "../ScoreBoard/ScoreBoard";

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

  const fireworksRef = useRef();
  const resultMessageRef = useRef();
  const [xPlaying, setXPlaying] = useState(true);
  const [gameOver, setGameOver] = useState(false);
  const [board, setBoard] = useState(Array(9).fill(null));
  const [scores, setScores] = useState({ xScore: 0, oScore: 0, result: "" });

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
        setScores((prev) => ({ ...prev, oScore: prev.oScore++, result: "O" }));
      } else {
        setScores((prev) => ({ ...prev, xScore: prev.xScore++, result: "X" }));
      }
      setGameOver(true);
    }

    const lastRound = updatedBoard.find((v) => v === null);

    if (!winner && lastRound === undefined) {
      setScores((prev) => ({ ...prev, result: "Draw" }));
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
    setScores((prev) => ({ ...prev, result: "" }));
  };

  useEffect(() => {
    let split;
    let tl;

    if (resultMessageRef.current) {
      split = SplitText.create(resultMessageRef.current, {
        lineClass: "text",
      });
      tl = gsap.timeline();

      tl.from(split.chars, { y: 40, opacity: 0, ease: "back", stagger: 0.033 });
    }

    return () => {
      if (tl) tl.kill();
      if (split) split.revert();
    };
  }, [gameOver]);

  return (
    <div className="app">
      <ScoreBoard scores={scores} gameOver={gameOver} xPlaying={xPlaying} />
      <Board board={board} onClick={!gameOver ? handleBoxClick : () => {}} />
      <div className="resultMessage">
        {gameOver && (
          <div
            ref={resultMessageRef}
            id="resultMessage"
            className={`message
        ${scores.result === "X" && "XWon"}
        ${scores.result === "O" && "OWon"}`}
          >
            <>
              {scores.result === "O" && scores.result + " has won!"}
              {scores.result === "X" && scores.result + " has won!"}
              {scores.result === "Draw" && scores.result}
            </>
          </div>
        )}
      </div>
      <ResetBtn onClick={resetGame} />

      {(scores.result === "O" || scores.result === "X") && (
        <Player
          ref={fireworksRef}
          className="fireworks"
          autoplay
          src="https://assets2.lottiefiles.com/packages/lf20_rovf9gzu.json"
        />
      )}
    </div>
  );
}

export default App;
