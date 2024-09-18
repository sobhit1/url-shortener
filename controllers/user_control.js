const User = require("../models/user_schema");

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
    const newUser = new User({
      name,
      email,
      password,
    });
    await newUser.save();
    return sendResponse(200, true, "User created successfully", null, res);
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
    return sendResponse(200, true, "Login successful", null, res);
  } catch (error) {
    return sendResponse(500, false, error.message, null, res);
  }
};

module.exports = { createUser, loginUser };
