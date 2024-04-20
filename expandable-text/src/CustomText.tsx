import { useState } from "react";

interface props {
  children: String;
  maxChars: number;
}

export const CustomText = ({ children, maxChars }: props) => {
  const [showMore, setShowMore] = useState(true);
  const handleClick = () => {
    setShowMore(!showMore);
  };
  const getText = () => {
    return children.substring(0, maxChars) + "...";
  };
  return (
    <div>
      {showMore ? children : getText()}
      <button onClick={handleClick}> {showMore ? "Less" : "More"} </button>
    </div>
  );
};
