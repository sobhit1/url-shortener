const express = require("express");
const router = express.Router();
const { createUser, loginUser } = require("../controllers/user_control");

router.post("/", createUser);

router.post("/login", loginUser);

module.exports = router;