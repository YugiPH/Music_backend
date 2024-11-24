const express = require('express');
const { getSongs, createSong, updateSong, deleteSong, getSongById, getFavoriteSongs } = require('../controllers/songController')

const router = express.Router();


router.get("/", getSongs);
router.get("/:id", getSongById);
router.post("/", createSong);
router.put("/:id", updateSong);
router.delete("/:id", deleteSong);
router.post("/favorite", getFavoriteSongs)

module.exports = router;