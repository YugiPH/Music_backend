const express = require('express');
const { getUsers, createUser, updateUser, deleteUser, addFavoriteSong, getFavoriteSongs } = require('../controllers/userController');

const router = express.Router();


router.get("/", getUsers);
router.post("/", createUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
router.post("/addfavorite", addFavoriteSong)
router.post("/getfavorite", getFavoriteSongs)

module.exports = router;