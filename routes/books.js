const express = require("express");
const router = express.Router();
const Book = require("../models/book");
const Author = require("../models/author");
router.use(express.json()); //add here instead in export
/* GET books listing. */
router.get("/", async (req, res, next) => {
  const books = await Book.find().populate("authorId"); //author here is from model
  res.json(books);
});

router.get("/:id", async (req, res, next) => {
  const findBook = await Book.findById(req.params.id);
  res.json(findBook);
  // res.json({ message: `get book with id ${req.params.id}` });
});

router.post("/", async (req, res, next) => {
  try {
    const newBook = new Book({
      title: req.body.title,
      authorId: req.body.authorId
    });
    await newBook.save(); //things that hit database are async
    res.status(201).json({ message: "Book created successfully" });
  } catch (error) {
    res
      .json({ message: "Book validation failed", err: error.message })
      .status(404);
    console.error("error", error);
  }
});

router.put("/:id", async (req, res, next) => {
  await Book.findByIdAndUpdate(req.params.id, req.body);
  res.json({ message: `update book with id ${req.params.id}` });
});

router.delete("/:id", async (req, res, next) => {
  await Book.findByIdAndDelete(req.params.id, req.body);
  res.json({ message: `delete book with id ${req.params.id}` });
});

// module.exports = router;
module.exports = app => {
  // app.use(express.json());
  app.use("/books", router);
};
