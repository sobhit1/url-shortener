const { getUser } = require("../service/auth");

async function restrictToLoggedInUserOnly(req, res, next) {
  try {
    const userId = req.cookies?.uid;
    if (!userId) {
      return res.redirect("/login");
    }
    const user = await getUser(userId);
    if (!user) {
      return res.redirect("/login");
    }
    req.user = user;
    next();
  } catch (error) {
    console.error("Middleware Error:", error);
    return res.status(500).send("Server error");
  }
}

async function checkAuth(req, res, next) {
  try {
    const userId = req.cookies?.uid;

    const user = await getUser(userId);

    req.user = user;
    next();
  } catch (error) {
    console.error("Middleware Error:", error);
    return res.status(500).send("Server error");
  }
}

module.exports = { restrictToLoggedInUserOnly, checkAuth };
