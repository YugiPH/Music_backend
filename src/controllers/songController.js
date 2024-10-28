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

const createSong = async (req, res) => {
    try {
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).send('No files were uploaded');
        }
        const result = await songService.createSong(req.body, req.files.songFiles, req.files.imageFiles);
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
        const result = await songService.deleteSong(_id);
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
    getSongs, createSong,
    updateSong, deleteSong
}