const User = require("../models/user_schema");
const {v4: uuidv4} = require('uuid');
const {setUser} = require('../service/auth');
function sendResponse(statusCode = 200, success, message, data, res) {
  res.status(statusCode).send({
    success: success,
    message: message,
    data: data,
  });
  return;
}

const createUser = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return sendResponse(400, false, "All fields are required", null, res);
  }
  try {
    const user = await User.findOne({ email });
    if (user) {
      return sendResponse(400, false, "User already exists", null, res);
    }
    if(password.length < 8){
      return sendResponse(400, false, "Password must be at least 8 characters", null, res);
    }
    if(!password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)){
      return sendResponse(400, false, "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character", null, res);
    }
    const newUser = new User({
      name,
      email,
      password,
    });
    await newUser.save();
    return res.redirect("/");
  } catch (error) {
    return sendResponse(500, false, error.message, null, res);
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return sendResponse(400, false, "All fields are required", null, res);
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return sendResponse(400, false, "User not found", null, res);
    }
    if (user.password !== password) {
      return sendResponse(400, false, "Incorrect password", null, res);
    }
    const sessionId = uuidv4();
    setUser(sessionId, user);
    res.cookie("uid", sessionId);
    return res.redirect("/");
  } catch (error) {
    return sendResponse(500, false, error.message, null, res);
  }
};

module.exports = { createUser, loginUser };
