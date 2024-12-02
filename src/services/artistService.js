const Artist = require("../models/artist")

const getArtists = async () => {
    const artists = await Artist.find({});
    return {
        ok: true,
        statusCode: 200,
        data: artists,
        message: "Lay danh sach nghe si thanh cong!"
    }
}

const getArtistById = async (artistId) => {
    const artist = await Artist.findOne({ _id: artistId }).populate('songs').exec();
    if (!artist) {
        return {
            ok: false,
            statusCode: 404,
            message: "Không tìm thấy nghệ sĩ"
        };
    }
    return {
        ok: true,
        statusCode: 200,
        data: artist,
        message: "Lấy thành công!"
    };
};

const createArtist = async (data) => {
    const { name, bio } = data
    const isExist = await Artist.findOne({ name: name }).exec();
    if (isExist) {
        return {
            ok: false,
            statusCode: 400,
            message: `Ten ${name} da ton tai!`
        }
    }
    const artist = await Artist.create(
        { name, bio }
    );
    return {
        ok: true,
        statusCode: 200,
        data: artist,
        message: "Tao thanh cong!"
    }
}

const addAlbums = async (artistId, albumId) => {
    if (!artistId || !albumId) {
        return {
            ok: false,
            statusCode: 400,
            message: `Missing required params`
        }
    }

    const artist = await Artist.updateOne(
        { _id: artistId },
        { $push: { albums: { $each: [albumId] } } }
    )
    return {
        ok: true,
        statusCode: 200,
        data: artist,
        message: "Them album vao thanh cong!"
    }
}

const addSongs = async (artistId, songId) => {
    if (!artistId || !songId) {
        return {
            ok: false,
            statusCode: 400,
            message: `Missing required params`
        }
    }

    const artist = await Artist.updateOne(
        { _id: artistId },
        { $push: { songs: { $each: [songId] } } }
    )
    return {
        ok: true,
        statusCode: 200,
        data: artist,
        message: "Them bai hat vao thanh cong!"
    }
}

const updateArtist = async (_id, name) => {
    if (!_id || !name) {
        return {
            ok: false,
            statusCode: 400,
            message: `Missing required params`
        }
    }
    const data = await Artist.updateOne({ _id: _id }, { name: name });
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

const deleteArtist = async (_id) => {
    if (!_id) {
        return {
            ok: false,
            statusCode: 400,
            message: `Missing required params`
        }
    }
    const data = await Artist.deleteOne({ _id: _id });
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
    getArtists, createArtist,
    updateArtist, deleteArtist,
    addAlbums, getArtistById, addSongs
}