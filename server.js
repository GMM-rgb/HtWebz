const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Define the directory to serve (the HtWebz folder)
const serveDirectory = path.resolve(__dirname);

// Serve static files from the HtWebz folder
app.use(express.static(serveDirectory));

// Basic route for convenience
app.get('/', (req, res) => {
  res.send('Serving all files from the HtWebz folder! Navigate to /yourfile to access specific files.');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running and serving the HtWebz folder on http://localhost:${PORT}`);
});
