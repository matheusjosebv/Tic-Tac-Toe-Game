/* eslint-disable react/prop-types */
import "./ScoreBoard.scss";

export default function ScoreBoard({ scores, xPlaying, gameOver }) {
  const { xScore, oScore } = scores;
  return (
    <div className="scoreBoard">
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
