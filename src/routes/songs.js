const express = require('express');
const { getSongs, createSong, updateSong, deleteSong } = require('../controllers/songController')

const router = express.Router();


router.get("/", getSongs);
router.post("/", createSong);
router.put("/:id", updateSong);
router.delete("/:id", deleteSong);

module.exports = router;