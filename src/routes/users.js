const express = require('express');
const { getUsers, createUser, updateUser, deleteUser, addFavoriteSong, getFavoriteId, removeFavoriteSong, countUser } = require('../controllers/userController');

const router = express.Router();


router.get("/", getUsers);
router.post("/", createUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
router.post("/addfavorite", addFavoriteSong)
router.post("/getfavoriteid", getFavoriteId)
router.post("/remove-favorite", removeFavoriteSong)
router.get("/count", countUser)

module.exports = router;