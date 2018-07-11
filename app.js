const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/mongoDB-books");

const index = require("./routes/index");
const books = require("./routes/books");
const authors = require("./routes/authors");

const db = mongoose.connection;
db.on("error", () => {
  console.error("An error has occured");
});
const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/", index);
app.use("/books", books);
app.use("/authors", authors);

module.exports = app;
