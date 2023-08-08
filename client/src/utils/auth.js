import decode from 'jwt-decode'; // Import the jwt-decode library for token decoding

class AuthService {
  // Get user data from the decoded token
  getProfile() {
    return decode(this.getToken());
  }

  // Check if the user is logged in
  loggedIn() {
    const token = this.getToken(); // Get the user's token
    return !!token && !this.isTokenExpired(token); // Check token validity
  }

  // Check if a token is expired
  isTokenExpired(token) {
    try {
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) {
        return true; // Token is expired
      } else {
        return false; // Token is not expired
      }
    } catch (err) {
      return false; // An error occurred (invalid token)
    }
  }

  // Get the user's token from localStorage
  getToken() {
    return localStorage.getItem('id_token');
  }

  // Log in a user by saving their token to localStorage and redirecting
  login(idToken) {
    localStorage.setItem('id_token', idToken); // Save user token to localStorage
    window.location.assign('/'); // Redirect to the root path
  }

  // Log out a user by clearing token and profile data from localStorage
  logout() {
    localStorage.removeItem('id_token'); // Clear user token from localStorage
    // Reload the page to reset the application state
    window.location.assign('/');
  }
}

export default new AuthService(); // Export an instance of the AuthService class

