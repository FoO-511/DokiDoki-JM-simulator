import React, { useState, useRef } from "react";
import { useSpring, animated } from "@react-spring/web";

const calc = (x, y, rect) => [
  -(y - rect.top - rect.height / 2) / 10,
  (x - rect.left - rect.width / 2) / 10,
  1.05,
];

const trans = (x, y, s) =>
  `perspective(5000px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`;

const AnimateCardContainer = ({ children }) => {
  const ref = useRef(null);
  const [xys, setXys] = useState([0, 0, 1]);

  const gravi = useSpring({ xys });

  return (
    <animated.div
      style={{
        display: "table-cell",
        transform: gravi.xys.to(trans),
      }}
      onMouseLeave={() => setXys([0, 0, 1])}
      onMouseMove={(e) => {
        const rect = ref.current.getBoundingClientRect();
        setXys(calc(e.clientX, e.clientY, rect));
      }}
      ref={ref}
    >
      {children}
    </animated.div>
  );
};

export default AnimateCardContainer;
