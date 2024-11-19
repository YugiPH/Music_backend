const authService = require('../services/authService');
const register = async (req, res) => {
    try {
        const { username, email, password } = req.body
        if (!username || !email || !password) {
            return res.status(400).json({
                ok: false,
                data: null,
                message: 'Thong tin khong day du!'
            })
        }
        const result = await authService.register(username, email, password);
        return res.status(result.statusCode).json({
            ok: result.ok,
            data: result,

        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            data: null
        })
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(400).json({
                ok: false,
                data: null,
                message: 'Thong tin khong day du!'
            })
        }
        const result = await authService.login(email, password);
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

module.exports = {
    register, login
}