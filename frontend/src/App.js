import React, { useEffect, useState } from 'react';
import Grid from './components/grid';
import LevelSelector from './components/level_select';
import axios from 'axios';

const App = () => {
  const rows = 20;
  const cols = 20;

  const createGrid = () => Array.from({ length: rows }, () => Array(cols).fill(0));

  const [grid, setGrid] = useState(createGrid());
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [showLevelSelector, setShowLevelSelector] = useState(false);

  const loadLevel = (level) => {
    // Example logic to load different grids per level (customize per your game logic)
    const newGrid = createGrid();
    // Modify `newGrid` based on the level selected
    setGrid(newGrid);
  };

  const handleSelectLevel = (level) => {
    setSelectedLevel(level);
    loadLevel(level);
    setShowLevelSelector(false);
  };

  const toggleCell = (row, col) => {
    const newGrid = [...grid]; // copy grid
    newGrid[row][col] = grid[row][col] ? 0 : 1;
    setGrid(newGrid);
  };

  /*
  const [backendUrl, setBackendUrl] = useState('');

  useEffect(() => {
    console.log('Fetching backend config');
    const fetchConfig = async () => {
      try {
        const response = await axios.get('/api/config');
        const port = response.data.port;
        console.log('Backend URL:', `http://localhost:${port}`);
        setBackendUrl(`http://localhost:${port}`);
      } catch (error) {
        console.error('Error fetching backend config:', error);
      }
    };

    fetchConfig();
  }, []);
  */

  const sendGridToBackend = async () => {
    try {
      const backendUrl = 'http://localhost:5000'; // temporary until I fix the useEffect thing
      const response = await axios.post(`${backendUrl}/api/process-grid`, { grid });
      console.log('Processed grid from backend:', response.data.processedGrid);
    } catch (error) {
      console.error('Error sending grid to backend:', error);
    }
  };
  

  return (
    <div className="App">
      <h1>Game of Life</h1>
      {selectedLevel ? (
        <>
          <h2>Level {selectedLevel}</h2>
          <Grid grid={grid} toggleCell={toggleCell} />
        </>
      ) : (
        <h2>Select a Level to Start</h2>
      )}

      <button
        onClick={() => setShowLevelSelector(!showLevelSelector)}
        style={{ margin: '20px', padding: '10px 20px' }}
      >
        {showLevelSelector ? 'Close Level Selector' : 'Choose Level'}
      </button>

      {showLevelSelector && <LevelSelector onSelectLevel={handleSelectLevel} />}
    </div>
  );
};

export default App;
