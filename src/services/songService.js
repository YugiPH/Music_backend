const Song = require("../models/song");
const Genre = require("../models/genre");
const uploadService = require("../services/uploadService")

const getSongs = async () => {
    const songs = await Song.find({}).populate('artist');
    return {
        ok: true,
        statusCode: 200,
        data: songs,
        message: "Lay bai hat thanh cong!"
    }
}

const countSong = async () => {
    const songs = await Song.countDocuments({});
    return {
        ok: true,
        statusCode: 200,
        data: songs,
        message: "Lấy thông tin thành công!"
    }
}

const getSongById = async (id) => {
    const songs = await Song.findById(id).populate('artist');
    return {
        ok: true,
        statusCode: 200,
        data: songs,
        message: "Lay thanh cong!"
    }
}

const createSong = async (data, songfile, imagefile) => {
    const { title, artistId, genre } = data
    const isExist = await Song.findOne({ title: title }).exec();
    if (isExist) {
        return {
            ok: false,
            statusCode: 400,
            message: `Ten ${title} da ton tai!`
        }
    }

    let resultUploadSong = await uploadService.uploadFile(songfile, 'songs', 'video');
    let resultUploadImage = await uploadService.uploadFile(imagefile, 'images', 'image');

    const song = await Song.create(
        {
            title,
            artist: artistId,
            streamUrl: resultUploadSong.url,
            imageUrl: resultUploadImage.url,
            imagePublicId: resultUploadImage.public_id,
            streamPublicId: resultUploadSong.public_id,
            genre: genre
        }
    );

    if (song) {
        await Genre.updateOne(
            { _id: genre },
            { $push: { songs: { $each: [song._id] } } }
        );
        return {
            ok: true,
            statusCode: 200,
            data: song,
            message: "Them thanh cong!"
        }
    } else {
        return {
            ok: true,
            statusCode: 400,
            data: null,
            message: "Them bai hat that bai!"
        }
    }
}

const updateSong = async (_id, title, imageFiles) => {
    if (!_id || !title) {
        return {
            ok: false,
            statusCode: 400,
            message: `Missing required params`
        }
    }
    let resultUploadImage
    let data;
    if (imageFiles) {
        resultUploadImage = await uploadSingleFile(imageFiles, 'images');
        data = await Song.updateOne(
            { _id: _id },
            {
                title: title,
                imageUrl: resultUploadImage.path
            });
    }
    data = await Song.updateOne(
        { _id: _id },
        { title: title });

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

const deleteSong = async (_id, imagePublicId, streamPublicId) => {
    if (!_id) {
        return {
            ok: false,
            statusCode: 400,
            message: `Missing required params`
        }
    }

    const song = await Song.findById(_id)

    if (song) {
        await Genre.updateOne(
            { _id: song.genre },
            { $pull: { songs: song._id } }
        );
    }

    const data = await Song.deleteOne({ _id: _id });
    await uploadService.deleteFile(imagePublicId, 'image')
    await uploadService.deleteFile(streamPublicId, 'video')

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

const getFavoriteSongs = async (favoriteId) => {
    const song = await Song.find({ 'favoriteId': { $in: favoriteId } });
    return {
        ok: true,
        statusCode: 200,
        data: song,
        message: "Lay danh sach thanh cong!"
    }
}

const searchByTitle = async (title) => {
    const songs = await Song.find({
        title: { $regex: title, $options: 'i' }
    });

    return {
        ok: true,
        statusCode: 200,
        data: songs,
        message: "Tìm kiếm thành công!"
    };
}

module.exports = {
    getSongs, createSong,
    updateSong, deleteSong,
    getSongById, getFavoriteSongs,
    countSong, searchByTitle
}