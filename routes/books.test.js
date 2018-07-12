const request = require("supertest");
const express = require("express");
const booksRouter = require("./book");
const Book = require("../models/book");

const { MongoMemoryServer } = require("mongodb-memory-server");
const mongod = new MongoMemoryServer();
const mongoose = require("mongoose");

const app = express();
booksRouter(app);
let author1Save;
async function addFakeBooks() {
  const author1 = new Author({
    name: "paul",
    age: 49
  });
  author1Save = await author1.save();
  const book1 = new Book({
    title: "Alchemist",
    authorId: author1Save._id
  });
  await book1.save();
}

beforeAll(async () => {
  jest.setTimeout(120000);

  const uri = await mongod.getConnectionString();
  await mongoose.connect(uri);
});
afterAll(() => {
  mongoose.disconnect();
  mongod.stop();
});
test("Test GET/", async () => {
  const response = await request(app).get("/books");
  expect(response.status).toBe(200);
  expect(response.body.length).toEqual(1);
});
