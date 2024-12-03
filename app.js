const fileUpload = require('express-fileupload');
const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();
const usersRouter = require('./src/routes/users');
const songsRouter = require('./src/routes/songs');
const artistRouter = require('./src/routes/artists')
const authRouter = require('./src/routes/auth')
const playlistRouter = require('./src/routes/playlists')
const genreRouter = require('./src/routes/genre')

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/public', express.static(path.join(__dirname, 'src/public')));
// config file upload
app.use(
  fileUpload({
    useTempFiles: false,
  })
);
// Routes
app.get('/', (req, res) => {
  res.send('Welcome to Music App');
});

app.use('/users', usersRouter);
app.use('/songs', songsRouter);
app.use('/artists', artistRouter);
app.use('/auth', authRouter)
app.use('/playlists', playlistRouter)
app.use('/genres', genreRouter);

// Khởi động server
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log('Server is running on port', PORT);
});
