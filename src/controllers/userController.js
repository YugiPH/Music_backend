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
module.exports = {
    getUsers, createUser,
    updateUser, deleteUser
}