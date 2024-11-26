const express = require('express');
const {
  addBook,
  getBooks,
  getBookById,
  updateBook,
  deleteBook,
  borrowBook,
  returnBook
} = require('../controllers/bookController');
const upload = require('../config/multer');
const router = express.Router();

// Add a new book
router.post('/', upload.single('image'), addBook);

// Get all books
router.get('/', getBooks);

// Get a specific book by ID
router.get('/:id', getBookById);

// Update book details by ID
router.put('/:id', updateBook);

// Delete a book by ID
router.delete('/:id', deleteBook);

// Borrow a book by ID
router.post('/borrow/:id', borrowBook);

// Return a borrowed book by ID
router.post('/return/:id', returnBook);

module.exports = router;
