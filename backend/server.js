const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS
app.use(cors());

// JSON parsing middleware
app.use(express.json());

// GET route at /
app.get('/', (req, res) => {
  res.json({ message: "Trinethra API is running" });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
