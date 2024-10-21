const fileUpload = require('express-fileupload');
const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();
const usersRouter = require('./src/routes/users');
const songsRouter = require('./src/routes/songs');
const uploadRouter = require('./src/routes/upload');
const albumRouter = require('./src/routes/albums')

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// config file upload
app.use(fileUpload());
// Routes
app.get('/', (req, res) => {
  res.send('Welcome to Music App');
});

app.use('/users', usersRouter);
app.use('/songs', songsRouter);
app.use('/upload', uploadRouter);
app.use('/albums', albumRouter);
// Khởi động server
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log('Server is running on port', PORT);
});
