// Import required packages and modules
const express = require('express'); // Express framework for creating a web server
const { ApolloServer } = require('apollo-server-express'); // Apollo Server for GraphQL
const path = require('path'); // Path module for working with file paths
const db = require('./config/connection'); // Database connection
const { typeDefs, resolvers } = require('./schemas'); // GraphQL schema definitions and resolvers

// Create an instance of Apollo Server with the provided type definitions and resolvers
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const app = express(); // Create an Express application
const PORT = process.env.PORT || 3001; // Set the port number

app.use(express.urlencoded({ extended: true })); // Middleware for parsing URL-encoded data
app.use(express.json()); // Middleware for parsing JSON data

// Serve client/build as static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

// Define a route for the root URL
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html')); // Send the HTML file for the client app
});

// Define an async function to start the Apollo Server
const startApolloServer = async (typeDefs, resolvers) => {
  await server.start(); // Start the Apollo Server

  // Apply Apollo Server middleware to the Express app
  server.applyMiddleware({ app });

  // Once the database connection is open, start the Express app on the specified port
  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`🌍 API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    });
  });
};

// Call the async function to start the Apollo Server
startApolloServer(typeDefs, resolvers);
