const cloudinary = require('../cloudinary.config');

// API upload ảnh
const uploadFile = async (file, folder, resource_type) => {

    // Cloudinary upload stream
    const streamUpload = (fileBuffer) => {
        return new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
                {
                    folder: folder,
                    resource_type: resource_type
                },
                (error, result) => {
                    if (error) return reject(error);
                    resolve(result);
                });
            stream.end(fileBuffer); // Đưa buffer vào stream
        });
    };

    // Upload buffer từ file
    const uploadResult = await streamUpload(file.data);
    if (uploadResult.url && uploadResult.public_id) {
        return {
            url: uploadResult.url,
            public_id: uploadResult.public_id
        }
    }
};

const deleteFile = async (public_id, resource_type) => {

    // Xóa ảnh trên Cloudinary
    const result = await cloudinary.uploader.destroy(public_id, { resource_type: resource_type });

    if (result.result === "ok") {
        return true
    } else false
};

module.exports = {
    uploadFile, deleteFile
}