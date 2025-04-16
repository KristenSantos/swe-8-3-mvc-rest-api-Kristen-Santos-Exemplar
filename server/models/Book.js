const getId = require("../utils/getId");

const books = [
  { title: "Whispers of the Forgotten Forest", id: getId(), status: "To Read" },
  { title: "The Midnight Archivist", id: getId(), status: "Reading" },
  { title: "Beneath the Glass Sky", id: getId(), status: "Read" },
];

class Book {
  // Create a new book with a unique ID
  static create(title, status) {
    const newBook = {
      title,
      id: getId(),
      status,
    };
    books.push(newBook);
    return newBook;
  }

  // Returns a shallow copy of all books
  static listAll() {
    return [...books];
  }

  // Finds a book by its ID
  static find(id) {
    return books.find((book) => book.id === id);
  }

  // Updates the book's status if valid; returns updated book or null
  static editStatus(id, newStatus) {
    const validStatuses = ["To Read", "Reading", "Read"];
    if (!validStatuses.includes(newStatus)) return null;

    const book = Book.find(id);
    if (!book) return null;

    book.status = newStatus;
    return book;
  }

  // Removes a book by ID; returns true if successful
  static delete(id) {
    const bookIndex = books.findIndex((book) => book.id === id);
    if (bookIndex < 0) return false;

    books.splice(bookIndex, 1);
    return true;
  }
}

module.exports = Book;
