/* eslint-disable react/prop-types */
import "./ScoreBoard.scss";

export default function ScoreBoard({ scores, xPlaying }) {
  const { xScore, oScore } = scores;
  return (
    <div className="scoreBoard">
      <span className={`score xScore ${!xPlaying && "inactive"}`}>
        X - {xScore}
      </span>
      <span className={`score oScore ${xPlaying && "inactive"}`}>
        O - {oScore}
      </span>
    </div>
  );
}
