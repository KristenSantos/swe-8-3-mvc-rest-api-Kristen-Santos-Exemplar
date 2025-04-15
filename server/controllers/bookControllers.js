const Book = require("../models/Book");

// Controller for GET /api/books
const serveBooks = (req, res) => {
  const bookList = Book.listAll();
  res.send(bookList);
};

// Controller for GET /api/books/:id
const serveBook = (req, res) => {
  const { id } = req.params;
  const book = Book.find(Number(id));

  if (!book) {
    return res.status(404).send({ message: `No book with the id ${id}` });
  }

  res.send(book);
};

// Controller for POST /api/books
const createBook = (req, res) => {
  const { title, status } = req.body;

  if (!title || !status) {
    return res.status(400).send({ message: "Title and status are required" });
  }

  const newBook = Book.create(title, status);
  res.status(201).send(newBook);
};

// Controller for PATCH /api/books/:id
const updateStatus = (req, res) => {
  const { status } = req.body;
  const { id } = req.params;

  if (!status) {
    return res.status(400).send({ message: "Invalid status" });
  }

  const updatedStatus = Book.editStatus(Number(id), status);

  if (!updatedStatus) {
    return res.status(404).send({ message: `No book with the id ${id}` });
  }

  res.send(updatedStatus);
};

// Controller for DELETE /api/books/:id
const deleteBook = (req, res) => {
  const { id } = req.params;
  const didDelete = Book.delete(Number(id));

  if (!didDelete) {
    return res.status(404).send({ message: `No book with the id ${id}` });
  }

  res.sendStatus(204);
};

module.exports = {
  serveBooks,
  serveBook,
  createBook,
  updateStatus,
  deleteBook,
};
