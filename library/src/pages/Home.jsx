import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllBooks, createTitle } from "../adapters/bookAdapters";

const Home = () => {

  const [books, setBooks] = useState([]);
  const [newBookTitle, setNewBookTitle] = useState("");
  const [newBookStatus, setNewBookStatus] = useState("To Read");
  const [isLoading, setIsLoading] = useState(true);

  // Fetch all books
  useEffect(() => {
    const fetchBooks = async () => {
      setIsLoading(true);
      const [data, error] = await getAllBooks();
      if (Array.isArray(data)) {
        setBooks(data); 
      }
      setIsLoading(false);
    };

    fetchBooks();
  }, []);

  // Handle form submission to create a new book
  const handleCreateBook = async (e) => {
    e.preventDefault();

    if (!newBookTitle.trim()) return; // Avoid empty titles

    const [newBook, error] = await createTitle({
      title: newBookTitle,
      status: newBookStatus,
    });

    if (newBook) {
      setBooks((prev) => [...prev, newBook]); // Append new book to the list
      setNewBookTitle(""); // Reset form
      setNewBookStatus("To Read");
    }
  };

  return (
    <div className="container">
      <h1>📚 My Library</h1>

      {/* Form to create a new book */}
      <form onSubmit={handleCreateBook}>
        <label htmlFor="title">Book Title</label>
        <input
          type="text"
          id="title"
          value={newBookTitle}
          onChange={(e) => setNewBookTitle(e.target.value)}
          placeholder="e.g. The Night Circus"
        />

        <label htmlFor="status">Status</label>
        <select
          id="status"
          value={newBookStatus}
          onChange={(e) => setNewBookStatus(e.target.value)}
        >
          <option value="To Read">To Read</option>
          <option value="Reading">Reading</option>
          <option value="Read">Read</option>
        </select>

        <button type="submit">Add Book</button>
      </form>

      <hr />

      {/* Conditional rendering: handle loading state, empty state, and list state */}
      {isLoading ? (
        <p>Loading your books...</p>
      ) : books.length === 0 ? (
        <p>No books in your library yet. Start by adding one!</p>
      ) : (
        <ul>
          {books.map((book) => (
            <li key={book.id}>
              <Link to={`/books/${book.id}`}>
                <strong>{book.title}</strong> – {book.status}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Home;
