import React from 'react';
import './grid.css';

const Grid = ({ rows, cols }) => {
  // Create an array of grid cells based on the number of rows and columns
  const grid = Array.from({ length: rows }).map((_, rowIndex) =>
    Array.from({ length: cols }).map((_, colIndex) => (
      <div key={`${rowIndex}-${colIndex}`} className="cell"></div>
    ))
  );

  return (
    <div
      className="grid"
      style={{
        display: 'grid',
        gridTemplateRows: `repeat(${rows}, 20px)`,
        gridTemplateColumns: `repeat(${cols}, 20px)`,
      }}
    >
      {grid.flat()} {/* Flatten the array to render cells in a single dimension */}
    </div>
  );
};

export default Grid;