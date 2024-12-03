const express = require('express');
const { createGenre, getGenres, getGenreById } = require('../controllers/genreController');
const router = express.Router();

router.post("/", createGenre)
router.get("/", getGenres)
router.get("/:id", getGenreById)

module.exports = router;