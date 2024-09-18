const URL = require("../models/url_schema");
const shortid = require("shortid");

function sendResponse(statusCode = 200, success, message, data, res) {
  res.status(statusCode).send({
    success: success,
    message: message,
    data: data,
  });
  return;
}

const GenerateNewShortURL = async (req, res) => {
  const { url } = req.body;
  if (!url) {
    return sendResponse(400, false, "Url is Required", null, res);
  }
  try {
    const shortId = shortid.generate();
    const newUrl = new URL({
      shortId,
      RedirectURL: url,
      visitedHistory: [],
    });
    await newUrl.save();
    const responseData = {
      shortId: newUrl.shortId,
      RedirectURL: newUrl.RedirectURL,
    };
    return sendResponse(200, true, "URL shortened successfully", responseData, res);
  } catch (error) {
    return sendResponse(500, false, error.message, null, res);
  }
};


const handleRedirect = async (req, res) => {
  const { shortId } = req.params;
  try {
    const entry = await URL.findOneAndUpdate(
      { shortId },
      {
        $push: {
          visitedHistory: {
            timestamp: Date.now(),
          },
        },
      }
    );
    if (!entry) {
      return res.status(404).send("Not Found");
    }
    res.redirect(entry.RedirectURL);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

const getAnalysis = async (req, res) => {
  const { shortId } = req.params;
  try {
    const entry = await URL.findOne({ shortId });
    if (!entry) {
      return res.status(404).send("Not Found");
    }
    const totalVisits = entry.visitedHistory.length;
    const lastVisited =  totalVisits > 0 ? entry.visitedHistory[totalVisits - 1].timestamp : "Never visited";
    const analysis = {
      totalVisits,
      lastVisited,
      visitedHistory: entry.visitedHistory,
    };
    return sendResponse(200, true, "Success", analysis, res);
  } catch (error) {
    return sendResponse(500, false, error.message, null, res);
  }
};

module.exports = { GenerateNewShortURL, handleRedirect, getAnalysis };
