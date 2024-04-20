import { useState } from "react";

export const getRandomColor = () => {
  return "#" + Math.random().toString(16).substring(2, 8);
};

export const Circle = ({ radius }) => {
  const [color, setColor] = useState(getRandomColor());
  return (
    <div
      className="child"
      style={{
        height: radius * 2,
        width: radius * 2,
        background: color,
        // zIndex
      }}
      onClick={() => setColor(getRandomColor())}
    ></div>
  );
};
