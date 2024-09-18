const express = require("express");
const router = express.Router();
const { createUser, loginUser } = require("../controllers/user_control");

router.post("/user", createUser);
router.post("/user/login", loginUser);

module.exports = router;