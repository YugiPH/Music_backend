const Genre = require("../models/genre");

const createGenre = async (data) => {
    const { name } = data
    const isExist = await Genre.findOne({ name: name }).exec();
    if (isExist) {
        return {
            ok: false,
            statusCode: 400,
            message: 'Thể loại đã tồn tại!'
        }
    }
    if (!name) {
        return {
            ok: false,
            statusCode: 400,
            message: 'Thiếu tên thể loại!'
        }
    }
    const genre = await Genre.create(
        {
            name
        }
    );
    return {
        ok: true,
        statusCode: 200,
        data: genre,
        message: "Tạo thể loại thành công!"
    }
}

const getGenres = async () => {
    const genres = await Genre.find({});
    return {
        ok: true,
        statusCode: 200,
        data: genres,
        message: "Lấy danh sách thể loại thành công!"
    }
}

const getGenreById = async (genreId) => {
    const genre = await Genre.findOne({ _id: genreId }).populate('songs').exec();
    if (!genre) {
        return {
            ok: false,
            statusCode: 404,
            message: "Không tìm thấy thể loại!"
        };
    }
    return {
        ok: true,
        statusCode: 200,
        data: genre,
        message: "Lấy thành công!"
    };
};

module.exports = {
    createGenre, getGenres,
    getGenreById
}