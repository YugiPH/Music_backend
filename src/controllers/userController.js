const userService = require('../services/userService');

const getUsers = async (req, res) => {
    try {
        const result = await userService.getUsers();
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

const createUser = async (req, res) => {
    try {
        const result = await userService.createUsers(req.body);
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
const updateUser = async (req, res) => {
    try {
        const _id = req.params.id;
        const username = req.body.username
        const result = await userService.updateUser(_id, username);
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
const deleteUser = async (req, res) => {
    try {
        const _id = req.params.id;
        const result = await userService.deleteUser(_id);
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

const addFavoriteSong = async (req, res) => {
    try {
        const result = await userService.addFavoriteSong(req.body.userId, req.body.songId);
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

const getFavoriteId = async (req, res) => {
    try {
        const result = await userService.getFavoriteId(req.body.userId);
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

const removeFavoriteSong = async (req, res) => {
    try {
        const result = await userService.removeFavoriteSong(req.body.userId, req.body.songId);
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

const countUser = async (req, res) => {
    try {
        const result = await userService.countUser();
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
    getUsers, createUser,
    updateUser, deleteUser,
    addFavoriteSong, getFavoriteId,
    removeFavoriteSong, countUser
}