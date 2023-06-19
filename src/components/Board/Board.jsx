import "./Board.scss";
import Box from "../Box/Box";

export default function Board({ board, onClick }) {
  return (
    <div className="board">
      {board.map((value, i) => (
        <Box key={i} value={value} onClick={() => onClick(i)} />
      ))}
    </div>
  );
}
