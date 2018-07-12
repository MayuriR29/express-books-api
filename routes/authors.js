const express = require("express");
const router = express.Router();
const Author = require("../models/author");
const Book = require("../models/book");
router.use(express.json()); //add here instead in export
router.get("/", async (req, res, next) => {
  try {
    const authors = await Author.find();
    res.json(authors);
  } catch (err) {
    console.error("error ", err);
    next(err);
  }
});
router.get("/:id", async (req, res, next) => {
  try {
    const authors = await Author.findById(req.params.id);
    const booksByAuthor = await Book.find({
      authorId: req.params.id
    });
    res.status(200).json({
      ...authors.toJSON(),
      books: booksByAuthor
    });
  } catch (error) {
    console.error("error", error);
    next(error);
  }
});
router.post("/", async (req, res, next) => {
  try {
    const newAuthor = new Author({
      name: req.body.name,
      age: req.body.age
    });
    await newAuthor.save();
    res.status(201).json({ message: "Author created successfully" });
  } catch (error) {
    console.error("-->", error);
  }
});

// module.exports = router;
module.exports = app => {
  // app.use(express.json());
  app.use("/authors", router);
};
