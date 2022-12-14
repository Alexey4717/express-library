const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const dotenv = require("dotenv");

dotenv.config({ path: "./.env" });
const mongoose = require("mongoose");
const dev_db_url = `mongodb+srv://${process.env.EXPRESS_APP_DEV_DB_URL}/locallibrary?retryWrites=true&w=majority`;
const mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const authRouter = require("./routes/auth");
const catalogRouter = require("./routes/catalog");
const compression = require("compression");
const helmet = require("helmet");

const debug = require("debug")("author");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(compression());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use("/", indexRouter);
app.use("/auth", authRouter);
app.use("/users", usersRouter);
app.use("/catalog", catalogRouter);
app.use(helmet());
app.use(debug);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

app.disable("x-powered-by");

module.exports = app;
