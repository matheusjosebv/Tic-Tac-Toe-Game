/* eslint-disable react/prop-types */
import "./ScoreBoard.scss";
import gsap from "gsap";
import { useEffect, useRef } from "react";

export default function ScoreBoard({ scores, xPlaying, gameOver }) {
  const { xScore, oScore } = scores;

  const scoreBoardRef = useRef();

  useEffect(() => {
    const tl = gsap.timeline();
    const score = scoreBoardRef.current;

    tl.to(score, { y: 0, delay: 1.3, opacity: 1 }).to(score.children, {
      y: 0,
      opacity: 1,
      stagger: 0.2,
    });

    return () => {
      tl.kill();
    };
  }, []);
  return (
    <div className="scoreBoard" ref={scoreBoardRef}>
      <span
        className={`score xScore ${!xPlaying && "inactive"} 
        ${gameOver && "inactive"}`}
      >
        X - {xScore}
      </span>
      <span
        className={`score oScore ${xPlaying && "inactive"} 
        ${gameOver && "inactive"}`}
      >
        O - {oScore}
      </span>
    </div>
  );
}
