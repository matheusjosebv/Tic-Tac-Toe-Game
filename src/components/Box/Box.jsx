/* eslint-disable react/prop-types */
import "./Box.scss";
import gsap from "gsap";
import { useEffect, useRef } from "react";

export default function Box({ value, onClick, className }) {
  const boxRef = useRef();

  useEffect(() => {
    const box = boxRef.current.children;
    let tl = gsap.timeline({
      defaults: { ease: "back", duration: 0.17, delay: 0.075 },
    });
    if (value) tl.from(box, { scale: 0.0 }).to(box, { scale: 1 });

    return () => {
      if (tl) tl.kill();
    };
  }, [value]);

  const style = value === "X" ? "box x" : "box o";
  return (
    <button ref={boxRef} onClick={onClick} className={`${style}  ${className}`}>
      <div className="character">{value}</div>
    </button>
  );
}
