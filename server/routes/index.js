const router = require('express').Router(); // Import Express router
const path = require('path'); // Path module for working with file paths
const apiRoutes = require('./api'); // Import API routes from the 'api' module

// Route for '/api' endpoints
router.use('/api', apiRoutes);

// Serve React front-end in production
router.use((req, res) => {
  res.sendFile(path.join(__dirname, '../../client/build/index.html')); // Serve the React app's HTML file
});

module.exports = router;

