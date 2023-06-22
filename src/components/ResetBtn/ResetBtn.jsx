/* eslint-disable react/prop-types */
import gsap from "gsap";
import "./ResetBtn.scss";
import { useEffect, useRef } from "react";

export default function ResetBtn({ onClick }) {
  const resetBtnRef = useRef();

  useEffect(() => {
    const tl = gsap.timeline();

    tl.to(resetBtnRef.current, { opacity: 1, y: 0, delay: 1.6 });
    return () => {
      tl.kill();
    };
  }, []);

  return (
    <button ref={resetBtnRef} className="resetBtn" onClick={onClick}>
      Reset
    </button>
  );
}
