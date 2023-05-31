// 1737hr wed may31 2023

const { Router } = require("express");
const { postUser, getAllUsers, getOneUser } = require("../controllers/user.controller");

const router = Router();

// router.post('/', postUser);
router.route('/').post(postUser).get(getAllUsers)
router.get('/:age', getOneUser);

module.exports = { userRoute: router };