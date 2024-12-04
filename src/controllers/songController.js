const songService = require('../services/songService');

const getSongs = async (req, res) => {
    try {
        const result = await songService.getSongs();
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

const countSong = async (req, res) => {
    try {
        const result = await songService.countSong();
        return res.status(result.statusCode).json({
            ok: result.ok,
            data: result.data
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            data: null
        })
    }
}

const getSongById = async (req, res) => {
    try {
        const id = req.params.id
        const result = await songService.getSongById(id);
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

const createSong = async (req, res) => {
    try {
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).send('No files were uploaded');
        }
        const { title, artistId } = req.body
        const { songfile, imagefile } = req.files
        if (!title || !artistId) {
            return res.status(400).send('Missing require params!');
        }

        const result = await songService.createSong(req.body, songfile, imagefile);
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

const updateSong = async (req, res) => {
    try {
        const _id = req.params.id;
        const title = req.body.title
        const result = await songService.updateSong(_id, title, req.files.imageFiles);
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
const deleteSong = async (req, res) => {
    try {
        const _id = req.params.id;
        const { imagePublicId, streamPublicId } = req.body
        const result = await songService.deleteSong(_id, imagePublicId, streamPublicId);
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

const getFavoriteSongs = async (req, res) => {
    try {
        const result = await songService.getFavoriteSongs(req.body.favoriteId);
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

const searchByTitle = async (req, res) => {
    try {
        const result = await songService.searchByTitle(req.body.title);
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
    getSongs, createSong,
    updateSong, deleteSong,
    getSongById, getFavoriteSongs,
    countSong, searchByTitle
}