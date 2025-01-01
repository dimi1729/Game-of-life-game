import React, { useState } from 'react';
import Grid from './components/grid';

const App = () => {
  const rows = 20;
  const cols = 20;

  const createGrid = () => Array.from({ length: rows }, () => Array(cols).fill(0));

  const [grid, setGrid] = useState(createGrid());

  const toggleCell = (row, col) => {
    const newGrid = [...grid]; // copy grid
    newGrid[row][col] = grid[row][col] ? 0 : 1;
    setGrid(newGrid);
  };

  return (
    <div className="App">
      <div style={{ textAlign: 'center', width: '100%' }}>
        <h1 style={{ marginBottom: '20px' }}>Game of Life Game</h1>
      </div>
      <div className="Grid">
        <Grid grid={grid} toggleCell={toggleCell} />
      </div>
    </div>
  );
};

export default App;
