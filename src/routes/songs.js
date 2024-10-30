const express = require('express');
const { getSongs, createSong, updateSong, deleteSong, getSongById } = require('../controllers/songController')

const router = express.Router();


router.get("/", getSongs);
router.get("/:id", getSongById);
router.post("/", createSong);
router.put("/:id", updateSong);
router.delete("/:id", deleteSong);

module.exports = router;