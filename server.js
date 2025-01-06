import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();
const PORT = process.env.PORT;

const app = express();

app.use(cors());

// Middleware
app.use(bodyParser.json());

// Serve React app in production
app.use(express.static(path.join(path.resolve(), 'frontend', 'build')));

// API endpoint for getting config
app.get('/api/config', (req, res) => {
  res.json({ port: PORT });
});

// API endpoint
app.post('/api/process-grid', (req, res) => {
  try{
  const grid = req.body.grid;
  console.log('Received grid:', grid);
  res.json({ processedGrid: grid });
  }
  catch(err){
    console.log(err);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
