const path = require('path');
const fs = require('fs');

const uploadSingleFile = async (fileObject, folder) => {
    let uploadPath = path.resolve(__dirname, `../public/${folder}`);

    // Kiểm tra xem folder có tồn tại hay không, nếu không thì tạo mới
    if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath, { recursive: true }); // Tạo folder và tất cả các folder cha nếu chưa có
    }

    // get image extension
    let extName = path.extname(fileObject.name); // .png, .jpg, ...
    // get image's name
    let baseName = path.basename(fileObject.name, extName);
    // create final path
    let finalName = `${baseName}-${Date.now()}${extName}`;
    let finalPath = `${uploadPath}/${finalName}`;

    try {
        // Di chuyển file đến đường dẫn cuối cùng
        await fileObject.mv(finalPath);
        return {
            path: finalName,
            error: null,
            ok: true,
            message: "Thành công"
        };
    } catch (error) {
        console.log("err", uploadPath);
        return {
            ok: false,
            path: null,
            message: "Thất bại",
            error: JSON.stringify(error)
        };
    }
}

module.exports = {
    uploadSingleFile
}
