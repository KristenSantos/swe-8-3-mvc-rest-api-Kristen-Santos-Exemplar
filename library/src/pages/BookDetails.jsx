

import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  getBookById,
  updateBookStatus,
  deleteBook,
} from "../adapters/bookAdapters";

const BookDetails = () => {
  // Get the dynamic route parameter (:id)
  const { id } = useParams();
  const navigate = useNavigate();

  // Local state for the current book and selected status
  const [book, setBook] = useState(null);
  const [newStatus, setNewStatus] = useState("");

  //fetch book details when the component mounts or when `id` changes
  useEffect(() => {
    const fetchBook = async () => {
      const [foundBook, error] = await getBookById(id);
      if (foundBook) {
        setBook(foundBook); // Set the full book object
        setNewStatus(foundBook.status); // Pre-fill dropdown with current status
      }
    };

    fetchBook();
  }, [id]);

  // Handle form submit to update book's status
  const handleStatusUpdate = async (e) => {
    e.preventDefault();

    const [updatedBook, error] = await updateBookStatus(id, newStatus);
    if (updatedBook) {
      setBook(updatedBook); 
      
    }
  };

  // Handle deleting the book, then navigate back to home
  const handleDelete = async () => {
    const [success, error] = await deleteBook(id);
    if (success) navigate("/"); 
  };


  if (!book) return <p>Loading book details...</p>;

  return (
    <div className="container">
      {/* Navigation back to home */}
      <Link to="/">← Back to Library</Link>

      <h1>📖 Book Details</h1>

      {/* Display book info */}
      <p>
        <strong>Title:</strong> {book.title}
      </p>
      <p>
        <strong>ID:</strong> {book.id}
      </p>
      <p>
        <strong>Current Status:</strong> {book.status}
      </p>

      {/* Form to update status */}
      <form onSubmit={handleStatusUpdate}>
        <label htmlFor="status">Change Status</label>
        <select
          id="status"
          value={newStatus}
          onChange={(e) => setNewStatus(e.target.value)}
        >
          <option value="To Read">To Read</option>
          <option value="Reading">Reading</option>
          <option value="Read">Read</option>
        </select>
        <button type="submit">Update Status</button>
      </form>

      {/* Button to delete the book */}
      <button onClick={handleDelete} className="danger">
        Delete Book
      </button>
    </div>
  );
};

export default BookDetails;
