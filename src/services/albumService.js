const Album = require("../models/album")

const getAlbums = async () => {
    const albums = await Album.find({});
    return {
        ok: true,
        statusCode: 200,
        data: albums,
        message: "Lay album thanh cong!"
    }
}
const createAlbum = async (data) => {
    const { title, releaseDate } = data
    const isExist = await Album.findOne({ title: title }).exec();
    if (isExist) {
        return {
            ok: false,
            statusCode: 400,
            message: `Ten ${title} da ton tai!`
        }
    }
    const album = await Album.create(
        { title, releaseDate }
    );
    return {
        ok: true,
        statusCode: 200,
        data: album,
        message: "Tao thanh cong!"
    }
}
const updateAlbum = async (_id, title) => {
    if (!_id || !title) {
        return {
            ok: false,
            statusCode: 400,
            message: `Missing required params`
        }
    }
    const data = await Album.updateOne({ _id: _id }, { title: title });
    if (data.upsertedCount === 0) {
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

const deleteAlbum = async (_id) => {
    if (!_id) {
        return {
            ok: false,
            statusCode: 400,
            message: `Missing required params`
        }
    }
    const data = await Album.deleteOne({ _id: _id });
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
module.exports = {
    getAlbums, createAlbum, updateAlbum, deleteAlbum
}