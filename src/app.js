const express = require("express");
const path = require("path");
const session = require("express-session");
require("dotenv").config();
require("./auth/passport");
const app = express();
const cookieParser = require("cookie-parser");
require("./database/config/db");
app.use(express.static(path.join(__dirname, "../public")));

app.use(express.urlencoded({ extended: false }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./views"));

const mainRouter = require("./routes/mainRouter");

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server in port: ${port}`);
});
app.use(
  session({
    secret: "Fmvo32@ffoe!slFOM3",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(cookieParser());
app.use(mainRouter);
