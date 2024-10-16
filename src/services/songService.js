const Song = require("../models/song")

const getSongs = async () => {
    const songs = await Song.find({});
    return {
        ok: true,
        statusCode: 200,
        data: songs,
        message: "Lay bai hat thanh cong!"
    }
}
const createSong = async (data) => {
    const { title, streamUrl } = data
    const isExist = await Song.findOne({ title: title }).exec();
    if (isExist) {
        return {
            ok: false,
            statusCode: 400,
            message: `Ten ${title} da ton tai!`
        }
    }
    const song = await Song.create(
        { title, streamUrl }
    );
    return {
        ok: true,
        statusCode: 200,
        data: song,
        message: "Tao thanh cong!"
    }
}

module.exports = {
    getSongs, createSong
}