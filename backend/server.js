const express = require('express')
const cors = require('cors');
const path = require('path');
const multer = require('./config/multer');
const connectDB = require('./config/db')
const authRoutes = require('./routes/authRoutes');
const bookRoutes = require('./routes/bookRoutes');
require('dotenv').config()
const PORT = process.env.PORT || 8000
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Example API Route
app.get('/', (req, res) => {
    res.send("Welcom To Library Management api....")
  });
app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);

app.listen(PORT, () => {
    console.log(`Server Running on ${PORT}`);
    connectDB();
})