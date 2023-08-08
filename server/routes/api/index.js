const router = require('express').Router(); // Import Express router
const userRoutes = require('./user-routes'); // Import user routes module

// Route: '/api/users'
// - Mount the userRoutes module under the '/users' subpath
router.use('/users', userRoutes);

module.exports = router;
