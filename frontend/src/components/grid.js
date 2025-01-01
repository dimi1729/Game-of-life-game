import React from 'react';
import './grid.css';

const Grid = ({ grid, toggleCell }) => {
  return (
    <div
      className="grid"
      style={{
        display: 'grid',
        gridTemplateRows: `repeat(${grid.length}, 20px)`,
        gridTemplateColumns: `repeat(${grid[0].length}, 20px)`,
      }}
    >
      {grid.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <div
            key={`${rowIndex}-${colIndex}`}
            className={`cell ${cell ? 'alive' : ''}`}
            onClick={() => toggleCell(rowIndex, colIndex)} // click toggles cells now
          ></div>
        ))
      )}
    </div>
  );
};

export default Grid;