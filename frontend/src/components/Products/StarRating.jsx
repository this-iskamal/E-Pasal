import React, { useState } from "react";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";

const StarRating = ({ rating, onRatingChange, readOnly }) => {
  const [hoveredRating, setHoveredRating] = useState(0);
  const [selectedRating, setSelectedRating] = useState(0);

  const handleStarClick = (starIndex) => {
    if (!readOnly) {
      setSelectedRating(starIndex);
      onRatingChange(starIndex);
    }
  };

  const handleStarHover = (starIndex) => {
    if (!readOnly) {
      setHoveredRating(starIndex);
    }
  };

  const handleStarLeave = () => {
    setHoveredRating(0);
  };

  const renderStar = (starIndex) => {
    const isFilled =rating? rating >= starIndex:selectedRating >= starIndex || hoveredRating >= starIndex; 
    // const isFilled = selectedRating >= starIndex || hoveredRating >= starIndex;
    const isHalfFilled =
      rating?rating + 0.5 === starIndex:hoveredRating + 0.5 === starIndex && selectedRating !== starIndex;

    return (
      <div
        key={starIndex}
        onMouseEnter={() => handleStarHover(starIndex)}
        onClick={() => handleStarClick(starIndex)}
        style={{ marginRight: "5px", color: isFilled ? "#B31312" : "gray" }}
      >
        {isHalfFilled ? <FaStarHalfAlt /> : <FaStar />}
      </div>
    );
  };

  return (
    <div
      onMouseLeave={handleStarLeave}
      style={{ display: "flex", cursor: readOnly ? "default" : "pointer" }}
    >
      {[1, 2, 3, 4, 5].map((starIndex) => renderStar(starIndex))}
    </div>
  );
};

export default StarRating;
