const Playlist = require("../models/playlist");

const createPlaylist = async (data) => {
    const { title } = data
    const isExist = await Playlist.findOne({ title: title }).exec();
    if (isExist) {
        return {
            ok: false,
            statusCode: 400,
            message: 'Danh sach phat da ton tai!'
        }
    }
    if (!title) {
        return {
            ok: false,
            statusCode: 400,
            message: 'Thieu du lieu!'
        }
    }
    const playlist = await Playlist.create(
        {
            title
        }
    );
    return {
        ok: true,
        statusCode: 200,
        data: playlist,
        message: "Tao thanh cong!"
    }
}

const addSongToPlaylist = async (data) => {
    const { songs, playlistId } = data
    const isExist = await Playlist.findById(playlistId);
    if (!isExist) {
        return {
            ok: false,
            statusCode: 400,
            message: 'Khong ton tai ds phat!'
        }
    }
    if (songs.length === 0) {
        return {
            ok: false,
            statusCode: 400,
            message: 'Thieu du lieu!'
        }
    }
    const playlist = await Playlist.updateOne(
        {
            _id: playlistId
        },
        { songs: songs }
    );
    if (playlist.modifiedCount > 0)
        return {
            ok: true,
            statusCode: 200,
            data: playlist,
            message: "Them bai hat vao ds phat thanh cong!"
        }
}

const getPlaylists = async () => {
    const playlists = await Playlist.find({}).populate('songs');
    return {
        ok: true,
        statusCode: 200,
        data: playlists,
        message: "Lay danh sach thanh cong!"
    }
}

const removeSongFromPlaylist = async (songId, playlistId) => {
    const isExist = await Playlist.findById(playlistId);
    if (!isExist) {
        return {
            ok: false,
            statusCode: 400,
            message: `Danh sach phat khong ton tai!`
        }
    }

    const data = await Playlist.updateOne(
        { _id: playlistId },
        { $pull: { songs: songId } }
    );

    if (data.modifiedCount > 0)
        return {
            ok: true,
            statusCode: 200,
            data: data,
            message: "Xoa bai hat khoi danh sach thanh cong!"
        }

}

const deletePlaylist = async (_id) => {
    if (!_id) {
        return {
            ok: false,
            statusCode: 400,
            message: `Missing required params`
        }
    }
    const data = await Playlist.deleteOne({ _id: _id });
    if (data.deletedCount === 1) {
        return {
            ok: true,
            statusCode: 200,
            data: data,
            message: "Xoa danh phat thanh cong!"
        }
    }
    else {
        return {
            ok: true,
            statusCode: 400,
            data: null,
            message: "Xoa danh sach phat that bai!"
        }
    }
}

module.exports = {
    createPlaylist, addSongToPlaylist,
    getPlaylists, removeSongFromPlaylist,
    deletePlaylist
}