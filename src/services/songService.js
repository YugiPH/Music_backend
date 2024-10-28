const Song = require("../models/song");
const { uploadSingleFile } = require("./uploadFile");

const getSongs = async () => {
    const songs = await Song.find({});
    return {
        ok: true,
        statusCode: 200,
        data: songs,
        message: "Lay bai hat thanh cong!"
    }
}
const createSong = async (data, songFiles, imageFiles) => {
    const { title, artistId } = data
    const isExist = await Song.findOne({ title: title }).exec();
    if (isExist) {
        return {
            ok: false,
            statusCode: 400,
            message: `Ten ${title} da ton tai!`
        }
    }
    let resultUploadSong = await uploadSingleFile(songFiles, 'songs');
    let resultUploadImage = await uploadSingleFile(imageFiles, 'images');
    const song = await Song.create(
        {
            title,
            artist: artistId,
            streamUrl: resultUploadSong.path,
            imageUrl: resultUploadImage.path
        }
    );
    return {
        ok: true,
        statusCode: 200,
        data: song,
        message: "Tao thanh cong!"
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

const deleteSong = async (_id) => {
    if (!_id) {
        return {
            ok: false,
            statusCode: 400,
            message: `Missing required params`
        }
    }
    const data = await Song.deleteOne({ _id: _id });
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
    getSongs, createSong, updateSong, deleteSong
}