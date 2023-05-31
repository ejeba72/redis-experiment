// 1737hr wed may31 2023

const { Router } = require("express");
const { postUser } = require("../controllers/user.controller");

const router = Router();

router.post('/', postUser);

module.exports = { userRoute: router };