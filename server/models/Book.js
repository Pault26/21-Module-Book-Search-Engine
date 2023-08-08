const { Schema } = require('mongoose'); // Import mongoose's Schema

// Define a subdocument schema for the User's savedBooks array in User.js
const bookSchema = new Schema({
  authors: [
    {
      type: String,
    },
  ], // Array of authors' names
  description: {
    type: String,
    required: true,
  }, // Description of the book
  bookId: {
    type: String,
    required: true,
  }, // ID of the book from Google Books
  image: {
    type: String,
  }, // URL to the book's cover image
  link: {
    type: String,
  }, // URL to the book's details page
  title: {
    type: String,
    required: true,
  }, // Title of the book
});

module.exports = bookSchema;

