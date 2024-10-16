const express = require('express');
const { getSongs, create } = require('../controllers/songController')

const router = express.Router();


router.get("/", getSongs);
router.post("/", create);
module.exports = router;