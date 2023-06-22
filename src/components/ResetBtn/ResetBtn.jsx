/* eslint-disable react/prop-types */
import "./ResetBtn.scss";

const ResetBtn = ({ onClick, name, className }) => {
  return (
    <button className={`resetBtn ${className}`} onClick={onClick}>
      {name}
    </button>
  );
};

export default ResetBtn;
