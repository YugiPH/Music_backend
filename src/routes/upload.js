const express = require('express');
const { uploadSingleFile } = require('../services/uploadFile')
const router = express.Router();
const uploadfile = async (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded');
    }
    let result = await uploadSingleFile(req.files.image);
    return res.status(200).json({
        errorCode: 0,
        data: result
    })
}
router.post("/", uploadfile);

module.exports = router;