import React from 'react';
import Grid from './components/grid';

const App = () => {
  const rows = 20; // Number of rows in the grid
  const cols = 20; // Number of columns in the grid

  return (
    <div>
      <div className="header">
        <h1>Game of Life Game</h1>
      </div>
      <div className="grid"> 
        <Grid rows={rows} cols={cols} />
      </div>
    </div>
  );
};

export default App;