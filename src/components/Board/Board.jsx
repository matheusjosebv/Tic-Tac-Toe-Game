/* eslint-disable react/prop-types */
import "./Board.scss";
import gsap from "gsap";
import Box from "../Box/Box";
import { useEffect, useRef } from "react";

export default function Board({ board, onClick, turn, gameOver }) {
  const boardRef = useRef();

  useEffect(() => {
    const tl = gsap.timeline();
    const board = boardRef.current.children;

    tl.to(board, { scale: 1, delay: 0.5, stagger: 0.1, ease: "back" });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div className="board" ref={boardRef}>
      {board.map((value, i) => (
        <Box
          className={`box ${!gameOver && !value && (turn ? "xHover" : "oHover")}`}
          key={i}
          value={value}
          onClick={() => value === null && onClick(i)}
        />
      ))}
    </div>
  );
}
