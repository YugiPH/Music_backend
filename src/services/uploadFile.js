const path = require('path');

const uploadSingleFile = async (fileObject) => {
    let uploadPath = path.resolve(__dirname, "../public/images");
    // get image extension
    let extName = path.extname(fileObject.name); // .png, .jpg, ...
    // get image's name
    let baseName = path.basename(fileObject.name, extName);
    // create final path
    let finalName = `${baseName}-${Date.now()}${extName}`;
    let finalPath = `${uploadPath}/${finalName}`;

    try {
        await fileObject.mv(finalPath);
        return {
            path: finalName,
            error: null,
            ok: true,
            message: "Thanh cong"
        };
    } catch (error) {
        console.log("err", uploadPath);
        return {
            ok: false,
            path: null,
            message: "That bai",
            error: JSON.stringify(error)
        }
    }
}

module.exports = {
    uploadSingleFile
}