const { Schema, model } = require('mongoose'); // Import mongoose's Schema and model
const bcrypt = require('bcrypt'); // Import bcrypt for password hashing

// Import bookSchema from Book.js
const bookSchema = require('./Book');

// Define the user schema
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    }, // User's username
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Must use a valid email address'],
    }, // User's email address
    password: {
      type: String,
      required: true,
    }, // User's password (hashed)
    savedBooks: [bookSchema], // Array of saved books using the bookSchema
  },
  {
    toJSON: {
      virtuals: true,
    }, // Include virtual fields in the JSON representation
  }
);

// Hash user password before saving
userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds); // Hash the password
  }

  next();
});

// Custom method to compare and validate password for logging in
userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password); // Compare the provided password with the hashed password
};

// Define a virtual field 'bookCount' that returns the number of saved books
userSchema.virtual('bookCount').get(function () {
  return this.savedBooks.length;
});

const User = model('User', userSchema); // Create the 'User' model

module.exports = User;

