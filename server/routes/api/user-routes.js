const router = require('express').Router(); // Import Express router
const {
  createUser,
  getSingleUser,
  saveBook,
  deleteBook,
  login,
} = require('../../controllers/user-controller'); // Import user controller functions

// Import middleware
const { authMiddleware } = require('../../utils/auth'); // Import authentication middleware

// Use authMiddleware for routes that require token verification
// Route: POST '/api/users'
// - Create a new user
// - Requires authentication middleware for saving books
router.route('/').post(createUser).put(authMiddleware, saveBook);

// Route: POST '/api/users/login'
// - User login
router.route('/login').post(login);

// Route: GET '/api/users/me'
// - Get the details of the currently authenticated user
// - Requires authentication middleware
router.route('/me').get(authMiddleware, getSingleUser);

// Route: DELETE '/api/users/books/:bookId'
// - Delete a book from the user's saved books
// - Requires authentication middleware
router.route('/books/:bookId').delete(authMiddleware, deleteBook);

module.exports = router;
