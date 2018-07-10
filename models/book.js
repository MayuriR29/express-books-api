const mongoose = require("mongoose");
const booksSchema = mongoose.Schema({
  title: String,
  author: String,
  price: Number
});

const Book = mongoose.model("Book", booksSchema);
module.exports = Book;
