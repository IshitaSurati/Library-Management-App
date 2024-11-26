import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const BookDetail = () => {
  const { id } = useParams(); // Get book ID from URL
  const [book, setBook] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch book details from API
    axios
      .get(`http://localhost:5000/api/books/${id}`)
      .then((response) => setBook(response.data))
      .catch((error) => {
        console.error('Error fetching book details:', error);
        alert('Failed to load book details');
      });
  }, [id]);

  const handleBorrowReturn = () => {
    const action = book.isAvailable ? 'borrow' : 'return';

    // Handle borrow/return action
    axios
      .post(`http://localhost:5000/api/books/${id}/${action}`, {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
      .then(() => {
        alert(`Book successfully ${action}ed`);
        navigate('/');
      })
      .catch((error) => {
        console.error('Error borrowing/returning the book:', error);
        alert('Error borrowing/returning the book');
      });
  };

  const handleDeleteBook = () => {
    // Handle delete book action
    axios
      .delete(`http://localhost:5000/api/books/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
      .then(() => {
        alert('Book deleted successfully');
        navigate('/');
      })
      .catch((error) => {
        console.error('Error deleting the book:', error);
        alert('Error deleting the book');
      });
  };

  if (!book) return <p>Loading book details...</p>;

  return (
    <div className="book-detail">
      <div className="book-detail-info">
        <h2>{book.title}</h2>
        <p><strong>Author:</strong> {book.author}</p>
        <p><strong>Genre:</strong> {book.genre}</p>
        <p><strong>Publication Date:</strong> {book.publicationDate}</p>
        <p><strong>Status:</strong> {book.isAvailable ? 'Available' : 'Borrowed'}</p>
        
        {/* Borrow/Return button */}
        <button onClick={handleBorrowReturn}>
          {book.isAvailable ? 'Borrow' : 'Return'}
        </button>

        {/* Delete button */}
        <button 
          onClick={handleDeleteBook} 
          style={{ marginTop: '10px', backgroundColor: 'red', color: 'white' }}
        >
          Delete Book
        </button>
      </div>

      {/* Display book image if available */}
      {book.image && <img src={book.image} alt={book.title} style={{ marginTop: '20px', maxWidth: '100%' }} />}
    </div>
  );
};

export default BookDetail;

