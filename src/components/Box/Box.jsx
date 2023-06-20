/* eslint-disable react/prop-types */
import "./Box.scss";

export default function Box({ value, onClick }) {
  const style = value === "X" ? "box x" : "box o";
  return (
    <button onClick={onClick} className={style}>
      {value}
    </button>
  );
}
