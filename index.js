const express = require("express");
const path = require("path");
const app = express();
const connectDB = require("./connection");
require("dotenv").config();
const urlRouter = require("./routes/url");
const staticRouter = require("./routes/staticRouter");
const PORT = 8000;

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use("/url", urlRouter);
app.use("/", staticRouter);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
