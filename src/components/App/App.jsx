import "./App.scss";
import Board from "../Board/Board";

function App() {
  const board = ["X", "X", "X", "X", "X", "X", "X", "X", "X"];

  return (
    <div className="app">
      <Board board={board} onClick={null} />
    </div>
  );
}

export default App;
