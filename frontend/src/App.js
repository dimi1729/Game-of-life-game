import React, { useEffect, useState } from 'react';
import Grid from './components/grid';
import axios from 'axios';

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
      <div style={{ textAlign: 'center', width: '100%' }}>
        <h1 style={{ marginBottom: '20px' }}>Game of Life Game</h1>
      </div>
      <div className="Grid">
        <Grid grid={grid} toggleCell={toggleCell} />
      </div>
      <div>
        <button onClick={sendGridToBackend}>send grid to backend (temp)</button>
      </div>
    </div>
  );
};

export default App;
