import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [filters, setFilters] = useState({
    genre: '',
    author: '',
    publicationDate: '',
  });

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/books')
      .then((response) => setBooks(response.data))
      .catch((error) => console.error(error));
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const filteredBooks = books.filter((book) => {
    const matchesGenre = filters.genre ? book.genre.toLowerCase().includes(filters.genre.toLowerCase()) : true;
    const matchesAuthor = filters.author ? book.author.toLowerCase().includes(filters.author.toLowerCase()) : true;
    const matchesPublicationDate = filters.publicationDate
      ? book.publicationDate.startsWith(filters.publicationDate)
      : true;
    return matchesGenre && matchesAuthor && matchesPublicationDate;
  });

  return (
    <div>
      <h2>Available Books</h2>

      {/* Filter Inputs */}
      <div>
        <input
          type="text"
          name="genre"
          placeholder="Filter by genre"
          onChange={handleFilterChange}
        />
        <input
          type="text"
          name="author"
          placeholder="Filter by author"
          onChange={handleFilterChange}
        />
        <input
          type="date"
          name="publicationDate"
          placeholder="Filter by publication date"
          onChange={handleFilterChange}
        />
      </div>

      {/* Book List */}
      <div className="book-list">
        {filteredBooks.map((book) => (
          <div className="book-item" key={book._id}>
            <img src={book.image || 'default_image.jpg'} alt={book.title} />
            <h3>{book.title}</h3>
            <p><strong>Author:</strong> {book.author}</p>
            <p><strong>Genre:</strong> {book.genre}</p>
            <p><strong>Published:</strong> {book.publicationDate}</p>
            <Link to={`/books/${book._id}`}>
              <button className="btn">View Details</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookList;
