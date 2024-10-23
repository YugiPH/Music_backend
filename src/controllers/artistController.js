const artistService = require('../services/artistService');

const getArtists = async (req, res) => {
    try {
        const result = await artistService.getArtists();
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

const getArtistById = async (req, res) => {
    try {
        const result = await artistService.getArtistById(req.params.id);
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

const createArtist = async (req, res) => {
    try {
        const result = await artistService.createArtist(req.body);
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

const updateArtist = async (req, res) => {
    try {
        const _id = req.params.id;
        const name = req.body.name
        const result = await artistService.updateArtist(_id, name);
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

const deleteArtist = async (req, res) => {
    try {
        const _id = req.params.id;
        const result = await artistService.deleteArtist(_id);
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

const addAlbums = async (req, res) => {
    try {
        const _id = req.params.id;
        const albumId = req.body.albumId
        const result = await artistService.addAlbums(_id, albumId);
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

const addSongs = async (req, res) => {
    try {
        const _id = req.params.id;
        const songId = req.body.songId
        const result = await artistService.addSongs(_id, songId);
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


module.exports = {
    getArtists, createArtist,
    updateArtist, deleteArtist,
    addAlbums, getArtistById, addSongs
}