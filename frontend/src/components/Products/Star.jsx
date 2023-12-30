import React from "react";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";

const StarDisplay = ({ rating }) => {
  const renderStar = (starIndex) => {
    const isFilled = rating >= starIndex;
    const isHalfFilled = rating + 0.5 === starIndex;

    return (
      <div
        key={starIndex}
        style={{ marginRight: "5px", color: isFilled ? "#B31312" : "gray" }}
      >
        {isHalfFilled ? <FaStarHalfAlt /> : <FaStar />}
      </div>
    );
  };

  return <div style={{ display: "flex" }}>{[1, 2, 3, 4, 5].map(renderStar)}</div>;
};

export default StarDisplay;
