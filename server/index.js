// Entry point for the server application
const express = require("express");
const app = express();
const path = require("path");

// Import controller functions to handle API logic
const {
  serveBooks,
  serveBook,
  createBook,
  updateStatus,
  deleteBook,
} = require("./controllers/bookControllers");

// Define path to the frontend's built (dist) folder
const pathToFrontendDist = path.join(__dirname, "../library/dist");
console.log("Serving file from:", path.join(pathToFrontendDist, "index.html"));

// Middleware: log every incoming request with method, URL, and timestamp
const logRoutes = (req, res, next) => {
  const time = new Date().toLocaleString();
  console.log(`${req.method}: ${req.originalUrl} - ${time}`);
  next(); // Important to call next() so request can continue
};

// Register middleware
app.use(logRoutes); // Log all requests
app.use(express.static(pathToFrontendDist)); // Serve static frontend files
app.use(express.json()); // Parse incoming JSON request bodies

// RESTful API Endpoints
app.get("/api/books", serveBooks); // Get all books
app.get("/api/books/:id", serveBook); // Get one book by ID
app.post("/api/books", createBook); // Create a new book
app.patch("/api/books/:id", updateStatus); // Update a book's status
app.delete("/api/books/:id", deleteBook); // Delete a book by ID

// Catch-all route: for non-API routes, serve frontend (for React Router support)
app.get("*", (req, res, next) => {
  if (req.originalUrl.startsWith("/api")) return next(); // Let API requests continue
  res.sendFile(path.join(pathToFrontendDist, "index.html")); // Serve React app
});

// Start the server
const port = 8080;
app.listen(port, () => console.log(`listening at http://localhost:${port}`));
