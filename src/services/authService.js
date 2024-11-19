const bcrypt = require('bcrypt');
const saltRounds = 10;
const User = require("../models/user")

const register = async (username, email, password) => {
    const isExist = await User.findOne({ email: email }).exec();
    if (isExist) {
        return {
            ok: false,
            statusCode: 400,
            message: `${email} da ton tai!`
        }
    }
    const hash = bcrypt.hashSync(password, saltRounds);
    const artist = await User.create(
        { username, email, password: hash }
    );
    return {
        ok: true,
        statusCode: 200,
        data: artist,
        message: "Tao thanh cong!"
    }
}

const login = async (email, password) => {
    const user = await User.findOne({ email: email }).exec();
    if (!user) {
        return {
            ok: false,
            statusCode: 400,
            message: `${email} khong ton tai!`
        }
    }
    const isCorrectPassword = bcrypt.compareSync(password, user.password);
    let result = null;
    if (isCorrectPassword === true)
        result = { username: user.username, email: user.email, _id: user._id }
    return {
        ok: true,
        statusCode: 200,
        data: result,
        message: "Dang nhap thanh cong!"
    }
}

module.exports = {
    register, login
}