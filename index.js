const express = require("express");
const path = require("path");
const app = express();
const connectDB = require("./connection");
const cookieParser = require("cookie-parser");
const {checkForAuthentication, restrictTo} = require("./middlewares/auth");
require("dotenv").config();
const PORT = 8000;

connectDB();

const urlRouter = require("./routes/url");
const staticRouter = require("./routes/staticRouter");
const userRouter = require("./routes/user");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthentication);

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use("/url", restrictTo(["USER", "ADMIN"]), urlRouter);
app.use("/user", userRouter);
app.use("/", staticRouter);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
