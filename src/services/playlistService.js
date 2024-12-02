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
    const { songs, playlistId } = data;

    // Kiểm tra playlist có tồn tại hay không
    const playlist = await Playlist.findById(playlistId);
    if (!playlist) {
        return {
            ok: false,
            statusCode: 400,
            message: 'Không tồn tại danh sách phát!'
        };
    }

    // Kiểm tra dữ liệu bài hát
    if (!songs || songs.length === 0) {
        return {
            ok: false,
            statusCode: 400,
            message: 'Thiếu dữ liệu bài hát!'
        };
    }

    // Lấy danh sách bài hát hiện tại
    const currentSongs = playlist.songs;

    // Lọc ra những bài hát chưa tồn tại
    const newSongs = songs.filter(song => !currentSongs.includes(song));

    if (newSongs.length === 0) {
        return {
            ok: false,
            statusCode: 400,
            message: 'Tất cả các bài hát đã tồn tại trong danh sách phát!'
        };
    }

    // Cập nhật playlist với những bài hát mới
    const updatedPlaylist = await Playlist.updateOne(
        { _id: playlistId },
        { $push: { songs: { $each: newSongs } } }
    );

    if (updatedPlaylist.modifiedCount > 0) {
        return {
            ok: true,
            statusCode: 200,
            data: updatedPlaylist,
            message: "Thêm bài hát vào danh sách phát thành công!"
        };
    }

    return {
        ok: false,
        statusCode: 400,
        message: "Không thể thêm bài hát vào danh sách phát!"
    };
};


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

const getPlaylistById = async (_id) => {
    const playlists = await Playlist.findById(_id).populate('songs');
    return {
        ok: true,
        statusCode: 200,
        data: playlists,
        message: "Lay danh sach thanh cong!"
    }
}

module.exports = {
    createPlaylist, addSongToPlaylist,
    getPlaylists, removeSongFromPlaylist,
    deletePlaylist, getPlaylistById
}