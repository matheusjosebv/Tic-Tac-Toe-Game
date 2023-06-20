/* eslint-disable react/prop-types */
import "./ResetBtn.scss";

export default function ResetBtn({ onClick }) {
  return (
    <button className="resetBtn" onClick={onClick}>
      Reset
    </button>
  );
}
