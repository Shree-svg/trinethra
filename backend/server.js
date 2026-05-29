const express = require('express');
const cors = require('cors');
require('dotenv').config();
const analyzeRouter = require('./analyzeRoute');

const app = express();
const PORT = process.env.PORT || 5001;
const OLLAMA_HOST = process.env.OLLAMA_HOST || 'http://localhost:11434';

// Enable CORS
app.use(cors());

// JSON parsing middleware
app.use(express.json());

// Make OLLAMA_HOST available to routes via locals
app.use((req, res, next) => { req.ollamaHost = OLLAMA_HOST; next(); });

// Routes
app.use('/api', analyzeRouter);

// GET route at /
app.get('/', (req, res) => {
  res.json({ message: "Trinethra API is running" });
});

// Start the server
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

module.exports = app;

