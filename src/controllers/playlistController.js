const playlistService = require('../services/playlistService');

const createPlaylist = async (req, res) => {
    try {
        const result = await playlistService.createPlaylist(req.body);
        return res.status(result.statusCode).json({
            ok: result.ok,
            data: result.data,
            message: result.message
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            data: null
        })
    }
}

const addSongToPlaylist = async (req, res) => {
    try {
        const result = await playlistService.addSongToPlaylist(req.body);
        return res.status(result.statusCode).json({
            ok: result.ok,
            data: result.data,
            message: result.message
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            data: null
        })
    }
}

const getPlaylists = async (req, res) => {
    try {
        const result = await playlistService.getPlaylists(req.body.userId);
        return res.status(result.statusCode).json({
            ok: result.ok,
            data: result.data
        })
    } catch (error) {
        return res.status(500).json({
            ok: false,
            data: null
        })
    }
}

const removeSongFromPlaylist = async (req, res) => {
    try {
        const result = await playlistService.removeSongFromPlaylist(req.body.songId, req.body.playlistId);
        return res.status(result.statusCode).json({
            ok: result.ok,
            data: result.data,
            message: result.message
        })
    } catch (error) {
        return res.status(500).json({
            ok: false,
            data: null
        })
    }
}

const deletePlaylist = async (req, res) => {
    try {
        const result = await playlistService.deletePlaylist(req.params.id);
        return res.status(result.statusCode).json({
            ok: result.ok,
            data: result.data,
            message: result.message
        })
    } catch (error) {
        return res.status(500).json({
            ok: false,
            data: null
        })
    }
}

const getPlaylistById = async (req, res) => {
    try {
        const result = await playlistService.getPlaylistById(req.params.id);
        return res.status(result.statusCode).json({
            ok: result.ok,
            data: result.data
        })
    } catch (error) {
        return res.status(500).json({
            ok: false,
            data: null
        })
    }
}

module.exports = {
    createPlaylist, addSongToPlaylist,
    getPlaylists, removeSongFromPlaylist,
    deletePlaylist, getPlaylistById
}