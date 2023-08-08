const mongoose = require('mongoose'); // Import mongoose

// Connect to the MongoDB database using the provided URI or a local URI
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/googlebooks', {
  useNewUrlParser: true, // Use the new URL parser
  useUnifiedTopology: true, // Use the new unified topology
  useCreateIndex: true, // Use the createIndex() function instead of deprecated ensureIndex()
  useFindAndModify: false, // Use the new findOneAndUpdate() and findOneAndDelete() instead of deprecated findAndModify()
});

module.exports = mongoose.connection; // Export the mongoose connection object

