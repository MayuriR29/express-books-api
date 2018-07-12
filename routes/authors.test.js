const request = require("supertest");
const express = require("express");
const authorsRouter = require("./authors");
const Author = require("../models/author");

const { MongoMemoryServer } = require("mongodb-memory-server");
const mongod = new MongoMemoryServer();
const mongoose = require("mongoose");

const app = express();
let author1Saved, author2Saved;
authorsRouter(app); //mount router on app
async function addFakeAuthors() {
  const author1 = new Author({
    name: "paul",
    age: 49
  });

  author1Saved = await author1.save();

  console.log("saved ====", author1Saved);
  const author2 = new Author({
    name: "john",
    age: 50
  });

  author2Saved = await author2.save();
}
beforeAll(async () => {
  jest.setTimeout(120000);

  const uri = await mongod.getConnectionString();
  await mongoose.connect(uri);
  await addFakeAuthors();
});

afterAll(() => {
  mongoose.disconnect();
  mongod.stop();
});

test("GET /authors", async () => {
  const response = await request(app).get("/authors");
  expect(response.status).toBe(200);
  expect(response.body.length).toEqual(2);
});
test("/GET/:id  /authors ", async () => {
  let getById=author1Saved._id;
  const response = await request(app).get("/authors/"+getById);
  console.log('response---->',response.body);
  expect(response.status).toBe(200);
//   const author = await Author.findOne({ name: author1Saved.name });
  expect(response.body.name).toBe("paul");
});

test("POST /author", async () => {
  const newAuthor = {
    name: "Robin",
    age: 50
  };
  const response = await request(app)
    .post("/authors")
    .send(newAuthor);
  expect(response.status).toBe(201);
  const authors = await Author.find();
  expect(authors.length).toBe(3);
});
