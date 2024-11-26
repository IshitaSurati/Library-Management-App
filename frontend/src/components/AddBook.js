import React, { useState } from 'react';
import axios from 'axios';

const AddBook = () => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    genre: '',
    publicationDate: '',
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      image: e.target.files[0],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    // Log data before sending it
    console.log('Form data being sent:', data);

    axios
      .post('http://localhost:5000/api/books/', data)
      .then(() => alert('Book added successfully'))
      .catch((error) => {
        console.error('Axios error:', error.response ? error.response.data : error.message);
        alert('Error adding book!');
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Title</label>
      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        required
      />

      <label>Author</label>
      <input
        type="text"
        name="author"
        value={formData.author}
        onChange={handleChange}
        required
      />

      <label>Genre</label>
      <input
        type="text"
        name="genre"
        value={formData.genre}
        onChange={handleChange}
        required
      />

      <label>Publication Date</label>
      <input
        type="date"
        name="publicationDate"
        value={formData.publicationDate}
        onChange={handleChange}
        required
      />

      <label>Image</label>
      <input type="file" name="image" onChange={handleFileChange} required />

      <button type="submit">Add Book</button>
    </form>
  );
};

export default AddBook;
