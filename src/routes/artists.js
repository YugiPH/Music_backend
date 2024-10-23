const express = require('express');
const { getArtists, createArtist, updateArtist, deleteArtist, addAlbums, getArtistById, addSongs } = require('../controllers/artistController')

const router = express.Router();


router.get("/", getArtists);
router.post("/", createArtist);
router.put("/:id", updateArtist);
router.delete("/:id", deleteArtist);
router.post("/add-album/:id", addAlbums);
router.post("/add-song/:id", addSongs);
router.get("/:id", getArtistById);


module.exports = router;