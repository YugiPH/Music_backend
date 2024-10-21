const albumService = require('../services/albumService');

const getAlbums = async (req, res) => {
    try {
        const result = await albumService.getAlbums();
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

const createAlbum = async (req, res) => {
    try {
        const result = await albumService.createAlbum(req.body);
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
const updateAlbum = async (req, res) => {
    try {
        const _id = req.params.id;
        const title = req.body.title
        const result = await albumService.updateAlbum(_id, title);
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
const deleteAlbum = async (req, res) => {
    try {
        const _id = req.params.id;
        const result = await albumService.deleteAlbum(_id);
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
    getAlbums, createAlbum,
    updateAlbum, deleteAlbum
}