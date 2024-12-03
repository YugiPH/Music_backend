const User = require("../models/user")
const Song = require("../models/song");
const Favorite = require("../models/favorite");

const getUsers = async () => {
    const users = await User.find({});
    return {
        ok: true,
        statusCode: 200,
        data: users,
        message: "Lay nguoi dung thanh cong!"
    }
}

const createUsers = async (data) => {
    const { username, email, password } = data
    const isExist = await User.findOne({ email: email }).exec();
    if (isExist) {
        return {
            ok: false,
            statusCode: 400,
            message: `email ${email} da ton tai!`
        }
    }
    const user = await User.create(
        { username: username, email: email, password: password }
    );
    return {
        ok: true,
        statusCode: 200,
        data: user,
        message: "Tao thanh cong!"
    }
}

const updateUser = async (_id, username) => {
    if (!_id || !username) {
        return {
            ok: false,
            statusCode: 400,
            message: `Missing required params`
        }
    }
    const data = await User.updateOne({ _id: _id }, { username: username });
    if (data.upsertedCount === 1) {
        return {
            ok: true,
            statusCode: 200,
            data: data,
            message: "Sua thanh cong!"
        }
    }
    else {
        return {
            ok: true,
            statusCode: 400,
            data: null,
            message: "Sua that bai!"
        }
    }
}

const deleteUser = async (_id) => {
    if (!_id) {
        return {
            ok: false,
            statusCode: 400,
            message: `Xoa thanh cong!`
        }
    }
    const data = await User.deleteOne({ _id: _id });
    if (data.deletedCount === 1) {
        return {
            ok: true,
            statusCode: 200,
            data: data,
            message: "Xoa thanh cong!"
        }
    }
    else {
        return {
            ok: true,
            statusCode: 400,
            data: null,
            message: "Xoa that bai!"
        }
    }
}

const addFavoriteSong = async (userId, songId) => {
    const isExist = await Song.findById(songId);
    if (!isExist) {
        return {
            ok: false,
            statusCode: 400,
            message: `Bai hat khong ton tai!`
        }
    }
    const favorite = await Favorite.create(
        { songId: songId, userId: userId }
    );

    await Song.updateOne(
        { _id: songId },
        { $push: { favoriteId: { $each: [favorite._id] } } }
    );

    await User.updateOne(
        { _id: userId },
        { $push: { favoriteId: { $each: [favorite._id] } } }
    )

    return {
        ok: true,
        statusCode: 200,
        data: favorite._id,
        message: "Them nhac vao ds thanh cong!"
    }
}

const getFavoriteId = async (userId) => {
    const user = await User.findById(userId).select('favoriteId');
    return {
        ok: true,
        statusCode: 200,
        data: user,
        message: "Lay danh sach thanh cong!"
    }
}

const removeFavoriteSong = async (userId, songId) => {
    const isExist = await Song.findById(songId);
    if (!isExist) {
        return {
            ok: false,
            statusCode: 400,
            message: `Bai hat khong ton tai!`
        }
    }
    const favorite = await Favorite.findOne({
        userId: userId,
        songId: songId
    });

    await Song.updateOne(
        { _id: songId },
        { $pull: { favoriteId: favorite._id } }
    );


    await User.updateOne(
        { _id: userId },
        { $pull: { favoriteId: favorite._id } }
    );

    const removeFavorite = await Favorite.deleteOne({
        userId: userId,
        songId: songId
    });

    if (removeFavorite.deletedCount === 1) {
        return {
            ok: true,
            statusCode: 200,
            data: removeFavorite,
            message: "Xoa yeu thich thanh cong!"
        }
    }
    else {
        return {
            ok: true,
            statusCode: 400,
            data: null,
            message: "Xoa yeu thich that bai!"
        }
    }
}

const countUser = async () => {
    const users = await User.countDocuments({});
    return {
        ok: true,
        statusCode: 200,
        data: users,
        message: "Lấy thông tin thành công!"
    }
}

module.exports = {
    getUsers, createUsers,
    updateUser, deleteUser,
    addFavoriteSong, getFavoriteId,
    removeFavoriteSong, countUser
}