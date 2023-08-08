const jwt = require('jsonwebtoken'); // Import the JWT library

// Set token secret and expiration date
const secret = 'mysecretsshhhhh'; // Secret key for token signing and verification
const expiration = '2h'; // Token expiration time

module.exports = {
  // Middleware function for authenticated routes
  authMiddleware: function (req, res, next) {
    // Allow token to be sent via req.query or headers
    let token = req.query.token || req.headers.authorization;

    // Extract token from authorization header if present
    if (req.headers.authorization) {
      token = token.split(' ').pop().trim(); // Remove 'Bearer' prefix
    }

    if (!token) {
      return res.status(400).json({ message: 'You have no token!' }); // No token provided
    }

    // Verify token and extract user data
    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration }); // Verify token using the secret
      req.user = data; // Attach user data to the request object
    } catch {
      console.log('Invalid token');
      return res.status(400).json({ message: 'Invalid token!' }); // Token verification failed
    }

    // Proceed to the next middleware or endpoint
    next();
  },

  // Function to sign a token
  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id }; // User data to include in the token's payload

    return jwt.sign({ data: payload }, secret, { expiresIn: expiration }); // Sign the token with user data
  },
};

