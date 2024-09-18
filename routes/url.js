const express = require("express");
const router = express.Router();
const { GenerateNewShortURL, handleRedirect, getAnalysis } = require("../controllers/control");

router.post("/", GenerateNewShortURL);

router.get("/:shortId", handleRedirect);

router.get("/:shortId/analysis", getAnalysis);

module.exports = router;
