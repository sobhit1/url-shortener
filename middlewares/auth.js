const { getUser } = require("../service/auth");

function checkForAuthentication(req, res, next) {
  try {
    const tokenCookie = req.cookies?.uid;
    req.user=null;
    if(!tokenCookie) return next();
    const user = getUser(tokenCookie);
    req.user = user;
    return next();
  } catch (error) {
    console.error("Middleware Error:", error);
    return res.status(500).send("Server error");
  }
}

function restrictTo(roles=[]){
  return (req, res, next) => {
    try {
      if(!req.user) return res.redirect("/login");
      if(!roles.includes(req.user.role)) return res.end("UnAuthorized");
      return next();
    } catch (error) {
      console.error("Middleware Error:", error);
      return res.status(500).send("Server error");
    }
  }
}

module.exports = { checkForAuthentication, restrictTo };
