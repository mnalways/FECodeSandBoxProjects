import { Circle } from "./Circle";

export const Concentric = ({ radiusArray }) => {
  const sortedArray = radiusArray.sort((a, b) => a.r - b.r).reverse();
  return (
    <div className="parent">
      {sortedArray.map((obj) => (
        <Circle radius={obj.r} />
      ))}
    </div>
  );
};
