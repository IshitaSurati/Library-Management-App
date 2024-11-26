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

// // Example API Route
// app.get('/api/books', (req, res) => {
//     res.status(200).json({ message: "Hello from the backend!" });
//   });
app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);

app.listen(PORT, () => {
    console.log(`Server Running on ${PORT}`);
    connectDB();
})