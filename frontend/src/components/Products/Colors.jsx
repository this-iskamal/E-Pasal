import React from 'react';

const Colors = ({ colors }) => {
  const colorsArray = colors.split(','); // Convert comma-separated string to an array

  return (
    <div className="colors">
      {colorsArray.map((color, index) => (
        <button style={{ background: color }} key={index}></button>
      ))}
    </div>
  );
};

export default Colors;
