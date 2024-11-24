const express = require('express');
const { createPlaylist, addSongToPlaylist, getPlaylists, removeSongFromPlaylist, deletePlaylist } = require('../controllers/playlistController')

const router = express.Router();


router.post("/", createPlaylist)
router.post("/addsong", addSongToPlaylist)
router.get("/", getPlaylists)
router.put("/remove-song", removeSongFromPlaylist)
router.delete("/:id", deletePlaylist)

module.exports = router;