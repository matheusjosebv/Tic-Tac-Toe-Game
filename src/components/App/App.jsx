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

  const btnsRef = useRef();
  const titleRef = useRef();
  const fireworksRef = useRef();
  const resultMessageRef = useRef();
  const [xPlaying, setXPlaying] = useState(true);
  const [gameOver, setGameOver] = useState(false);
  const [board, setBoard] = useState(Array(9).fill(null));
  const [scores, setScores] = useState({ xScore: 0, oScore: 0, ties: 0, result: "" });

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
        setScores((prev) => ({ ...prev, oScore: prev.oScore + 1, result: "O" }));
      } else {
        setScores((prev) => ({ ...prev, xScore: prev.xScore + 1, result: "X" }));
      }
      setGameOver(true);
    }

    const lastRound = updatedBoard.find((v) => v === null);

    if (!winner && lastRound === undefined) {
      setScores((prev) => ({ ...prev, ties: prev.ties + 1, result: "Draw" }));
      setGameOver(true);
    }

    setXPlaying((prev) => !prev);
    setBoard(updatedBoard);
  };

  const checkWinner = (b) => {
    for (let i = 0; i < WIN_CONDITIONS.length; i++) {
      const [x, y, z] = WIN_CONDITIONS[i];

      if (b[x] && b[x] === b[y] && b[y] === b[z]) {
        console.log(x, y, z);

        return b[x];
      }
    }
  };

  const restartMatch = () => {
    setGameOver(false);
    setBoard(Array(9).fill(null));
    setScores((prev) => ({ ...prev, result: "null" }));
  };

  const resetScore = () => {
    setGameOver(false);
    setBoard(Array(9).fill(null));
    setScores(() => ({ oScore: 0, xScore: 0, ties: 0, result: "null" }));
  };

  useEffect(() => {
    const tl = gsap.timeline();
    const btns = btnsRef.current.children;

    tl.to(titleRef.current, { y: 0, opacity: 1, delay: 0.2 }) //
      .to(btns, { y: 0, opacity: 1, delay: 1, stagger: 0.2 });

    return () => {
      tl.kill();
    };
  }, []);

  useEffect(() => {
    let split;
    let tl;

    if (resultMessageRef.current) {
      tl = gsap.timeline();
      split = SplitText.create(resultMessageRef.current, { lineClass: "text" });
      tl.from(split.chars, { y: 40, opacity: 0, ease: "back", stagger: 0.033 });
    }

    return () => {
      if (tl) tl.kill();
      if (split) split.revert();
    };
  }, [gameOver]);

  return (
    <div className="app">
      <h1 ref={titleRef} className="title">
        <span className="tic">Tic</span>
        <span className="tac">Tac</span>
        Toe
      </h1>

      <ScoreBoard scores={scores} gameOver={gameOver} xPlaying={xPlaying} />

      <Board
        board={board}
        turn={xPlaying}
        gameOver={gameOver}
        onClick={!gameOver ? handleBoxClick : () => {}}
      />

      <div className="resultMessage">
        {gameOver && (
          <div
            ref={resultMessageRef}
            id="resultMessage"
            className={`message
        ${scores.result === "X" && "XWon"}
        ${scores.result === "O" && "OWon"}
        ${scores.result === "Draw" && "drawWon"}
        `}
          >
            <>
              {scores.result === "Draw" && scores.result}
              {scores.result === "O" && scores.result + " has won!"}
              {scores.result === "X" && scores.result + " has won!"}
            </>
          </div>
        )}
      </div>

      <div ref={btnsRef} className="btns">
        <ResetBtn className="restartMatch" onClick={restartMatch} name={"Restart Match"} />
        <ResetBtn className="resetScore" onClick={resetScore} name={"Reset Score"} />
      </div>

      {(scores.result === "O" || scores.result === "X") && (
        <Player
          autoplay
          ref={fireworksRef}
          className="fireworks"
          src="https://assets2.lottiefiles.com/packages/lf20_rovf9gzu.json"
        />
      )}
    </div>
  );
}

export default App;
