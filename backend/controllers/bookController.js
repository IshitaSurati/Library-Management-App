const Book = require('../models/Book'); // Assuming you're using Mongoose or Sequelize
const fs = require('fs'); // For handling file removal in case of errors

// Add a new book
exports.addBook = async (req, res) => {
  try {
    const { title, author, genre, publicationDate } = req.body;
    const image = req.file ? req.file.path : null;

    if (!image) {
      return res.status(400).json({ error: 'Image is required' });
    }

    const newBook = await Book.create({
      title,
      author,
      genre,
      publicationDate,
      image,
    });

    res.status(201).json({ message: 'Book added successfully', book: newBook });
  } catch (error) {
    console.error('Error adding book:', error);
    // Handle file removal in case of error
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
    res.status(400).json({ error: error.message });
  }
};

// Get all books
exports.getBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    console.error('Error fetching books:', error);
    res.status(500).json({ error: error.message });
  }
};

// Get a book by ID
exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }
    res.status(200).json(book);
  } catch (error) {
    console.error('Error fetching book:', error);
    res.status(500).json({ error: error.message });
  }
};

// Update a book by ID
exports.updateBook = async (req, res) => {
  try {
    const { title, author, genre, publicationDate } = req.body;
    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      { title, author, genre, publicationDate },
      { new: true }
    );
    if (!updatedBook) {
      return res.status(404).json({ error: 'Book not found' });
    }
    res.status(200).json({ message: 'Book updated successfully', book: updatedBook });
  } catch (error) {
    console.error('Error updating book:', error);
    res.status(500).json({ error: error.message });
  }
};

// Delete a book by ID
exports.deleteBook = async (req, res) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);
    if (!deletedBook) {
      return res.status(404).json({ error: 'Book not found' });
    }
    res.status(200).json({ message: 'Book deleted successfully' });
  } catch (error) {
    console.error('Error deleting book:', error);
    res.status(500).json({ error: error.message });
  }
};

// Borrow a book
exports.borrowBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }

    if (book.status === 'borrowed') {
      return res.status(400).json({ error: 'Book is already borrowed' });
    }

    book.status = 'borrowed';
    await book.save();

    res.status(200).json({ message: 'Book borrowed successfully' });
  } catch (error) {
    console.error('Error borrowing book:', error);
    res.status(500).json({ error: error.message });
  }
};

// Return a borrowed book
exports.returnBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }

    if (book.status === 'available') {
      return res.status(400).json({ error: 'Book is already available' });
    }

    book.status = 'available';
    await book.save();

    res.status(200).json({ message: 'Book returned successfully' });
  } catch (error) {
    console.error('Error returning book:', error);
    res.status(500).json({ error: error.message });
  }
};
