const express = require('express');
const cors = require('cors');
const analyzeRouter = require('./analyzeRoute');

const app = express();
const PORT = process.env.PORT || 5001;

// Enable CORS
app.use(cors());

// JSON parsing middleware
app.use(express.json());

// Routes
app.use('/api', analyzeRouter);

// GET route at /
app.get('/', (req, res) => {
  res.json({ message: "Trinethra API is running" });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

