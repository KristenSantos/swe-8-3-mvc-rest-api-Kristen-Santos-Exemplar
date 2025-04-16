// Adapter: bookAdapters.js
// Purpose: Wrap API calls for book-related operations using handleFetch utility.
// Each function returns a [data, error] tuple for simplified error handling in components.

import handleFetch from "./handleFetch";

// Fetch all books from the server
export const getAllBooks = async () => {
  const [allBooks, error] = await handleFetch("/api/books");
  return [allBooks, error]; 
};

// Fetch a single book by its ID
export const getBookById = async (id) => {
  const [book, error] = await handleFetch(`/api/books/${id}`);
  return [book, error];
};

// Create a new book with title and status
export const createTitle = async (bookData) => {
  const options = {
    method: "POST", // RESTful convention for creating resources
    headers: { "Content-type": "application/json" }, // Tell the server we're sending JSON
    body: JSON.stringify(bookData), 
  };
  const [newBook, error] = await handleFetch(`/api/books`, options);
  return [newBook, error];
};

// Delete a book by ID
export const deleteBook = async (id) => {
  const options = {
    method: "DELETE", // RESTful deletion
  };
  const [success, error] = await handleFetch(`/api/books/${id}`, options);
  return [success, error];
};

// Update a book's status (PATCH = partial update)
export const updateBookStatus = async (id, status) => {
  const options = {
    method: "PATCH",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({ status }), // Send only what needs to change
  };
  const [updatedBookStatus, error] = await handleFetch(
    `/api/books/${id}`,
    options
  );
  return [updatedBookStatus, error];
};
