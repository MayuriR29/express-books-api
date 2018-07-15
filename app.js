const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const { passport } = require("./config/passport");

const mongodb_uri =
  process.env.MONGODB_URI || "mongodb://localhost/mongoDB-books";

const index = require("./routes/index");
const books = require("./routes/books");
const authors = require("./routes/authors");
const secretsRouter = require("./routes/secretsRouter");

mongoose.connect(mongodb_uri);
const db = mongoose.connection;
db.on("error", () => {
  console.error("An error has occured====>");
});

const app = express();
app.use(passport.initialize());
app.use(logger("dev"));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/", index);
books(app);
authors(app);
app.use(
  "/secret",
  passport.authenticate("jwt", { session: false }),
  secretsRouter
);

module.exports = app;
