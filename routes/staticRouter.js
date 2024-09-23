const express = require("express");
const router = express.Router();
const URL = require("../models/url_schema");
const User = require("../models/user_schema");
const { restrictTo } = require("../middlewares/auth");

router.get("/", restrictTo(["USER", "ADMIN"]), async (req, res) => {
    try {
        const allUrls = req.user.role === "ADMIN" ? await URL.find({}) : await URL.find({ createdBy: req.user._id });
        const allUsers = req.user.role === "ADMIN" ? await User.find({}) : null;
        res.render("home", { urls: allUrls, users: allUsers });
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).send("An error occurred while fetching data.");
    }
});

router.get("/signup", (req, res) => {
    res.render("signup");
});

router.get("/login", (req, res) => {
    res.render("login");
});

module.exports = router;
