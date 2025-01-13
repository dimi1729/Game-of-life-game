import React, { useState } from 'react';
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
  const [currentLevel, setCurrentLevel] = useState(1);

  const loadLevel = (level) => {
    const newGrid = createGrid();
    setGrid(newGrid); // Adjust `newGrid` based on `level` if needed
  };

  const handleSelectLevel = (level) => {
    setSelectedLevel(level);
    loadLevel(level);
    setShowLevelSelector(false);
  };

  const handleNext = () => {
    if (currentLevel < 20) {
      setCurrentLevel((prevLevel) => {
        const newLevel = prevLevel + 1;
        handleSelectLevel(newLevel);
        return newLevel;
      });
    }
  };

  const handlePrevious = () => {
    if (currentLevel > 1) {
      setCurrentLevel((prevLevel) => {
        const newLevel = prevLevel - 1;
        handleSelectLevel(newLevel);
        return newLevel;
      });
    }
  };

  const toggleCell = (row, col) => {
    const newGrid = [...grid];
    newGrid[row][col] = grid[row][col] ? 0 : 1;
    setGrid(newGrid);
  };

  const sendGridToBackend = async () => {
    try {
      const backendUrl = 'http://localhost:5000';
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

      {/* Show navigation buttons only when the level selector is not open */}
      {!showLevelSelector && (
        <div className="level-navigation">
          <button className="navigation-button" onClick={handlePrevious}>Previous</button>
          <button
            className="navigation-button"
            onClick={() => setShowLevelSelector(!showLevelSelector)}
          >
            Choose Level
          </button>
          <button className="navigation-button" onClick={handleNext}>Next</button>
        </div>
      )}

      {/* Render level selector only when toggled open */}
      {showLevelSelector && (
        <LevelSelector
          onSelectLevel={(level) => {
            setCurrentLevel(level);
            handleSelectLevel(level);
          }}
          currentLevel={currentLevel}
          setLevel={setCurrentLevel}
        />
      )}
    </div>
  );
};

export default App;

