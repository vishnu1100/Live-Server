const express = require('express');
const serveIndex = require('serve-index');
const path = require('path');
const app = express();
const PORT = 3000;

// Define the directory to serve
const directoryToServe = path.join(__dirname, '/games');

// Serve static files from the directory
app.use(express.static(directoryToServe));

// Serve directory listings for the directory
app.use(serveIndex(directoryToServe, { icons: true }));

// Start the server
app.listen(PORT, () => {
  console.log(`📁 File server running at http://localhost:${PORT}`);
});
