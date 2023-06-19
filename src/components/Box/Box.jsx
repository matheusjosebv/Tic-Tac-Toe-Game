import "./Box.scss";

// eslint-disable-next-line react/prop-types
export default function Box({ value, onClick }) {
  const style = value === "X" ? "box x" : "box o";
  return (
    <button onClick={onClick} className={style}>
      {value}
    </button>
  );
}
