const jwt = require("jsonwebtoken");
const secret = "secret#123456";

function setUser(user) {
    return jwt.sign({ _id: user._id, email: user.email }, secret);
}

function getUser(token) {
    if (!token) return null;
    try {
        const user = jwt.verify(token, secret);
        return user;
    } catch (error) {
        return null;
    }
}

module.exports = { setUser, getUser };