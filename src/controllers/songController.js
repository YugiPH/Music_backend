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

const create = async (req, res) => {
    try {
        const result = await songService.createSong(req.body);
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
const update = async (req, res) => {
    try {

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            data: null
        })
    }
}
module.exports = {
    getSongs, create
}