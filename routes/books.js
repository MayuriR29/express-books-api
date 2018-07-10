const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Book = require("../models/book");
/* GET books listing. */
router.get("/", async (req, res, next) => {
  const books = await Book.find();
  res.json(books);
});

router.get("/:id", async (req, res, next) => {
  const findBook = await Book.findById(req.params.id);
  res.json(findBook);
  // res.json({ message: `get book with id ${req.params.id}` });
});

router.post("/", async (req, res, next) => {
  const newBook = new Book({
    title: req.body.title,
    author: req.body.author
  });
  await newBook.save(); //things that hit database are async
  res.status(201).json({ message: "Book created successfully" });
});

router.put("/:id", async (req, res, next) => {
  await Book.findByIdAndUpdate(req.params.id, req.body);
  res.json({ message: `update book with id ${req.params.id}` });
});

router.delete("/:id", async (req, res, next) => {
  await Book.findByIdAndDelete(req.params.id, req.body);
  res.json({ message: `delete book with id ${req.params.id}` });
});

module.exports = router;
