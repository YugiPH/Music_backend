const genreService = require('../services/genreService')
const createGenre = async (req, res) => {
    try {

        const result = await genreService.createGenre(req.body);
        return res.status(result.statusCode).json({
            ok: result.ok,
            data: result.data,
            message: result.message
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            data: null,
            message: error.message
        })
    }
}

const getGenres = async (req, res) => {
    try {
        const result = await genreService.getGenres();
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

const getGenreById = async (req, res) => {
    try {
        const result = await genreService.getGenreById(req.params.id);
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
    createGenre, getGenres,
    getGenreById
}