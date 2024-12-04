const express = require('express');
const { createPlaylist, addSongToPlaylist, getPlaylists, removeSongFromPlaylist, deletePlaylist, getPlaylistById } = require('../controllers/playlistController')

const router = express.Router();


router.post("/", createPlaylist)
router.post("/addsong", addSongToPlaylist)
router.post("/get-playlists", getPlaylists)
router.put("/remove-song", removeSongFromPlaylist)
router.delete("/:id", deletePlaylist)
router.get("/:id", getPlaylistById)

module.exports = router;