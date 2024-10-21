const express = require('express');
const { getAlbums, createAlbum, updateAlbum, deleteAlbum } = require('../controllers/albumController')

const router = express.Router();


router.get("/", getAlbums);
router.post("/", createAlbum);
router.put("/:id", updateAlbum);
router.delete("/:id", deleteAlbum);

module.exports = router;