const mongoose = require("mongoose");
const Author = require("../models/author");
const booksSchema = mongoose.Schema({
  title: { type: String, required: true },
  authorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Author",
    required: true,
    validate: {
      validator(idAuthor) {
        return Author.findById(idAuthor);
      }
    }
  },
  price: Number
});

const Book = mongoose.model("Book", booksSchema);
module.exports = Book;
