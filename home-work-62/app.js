const express = require("express");
const path = require("path");

const logRequests = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const articlesRouter = require("./routes/articles");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CSS
app.use(express.static(path.join(__dirname, "public")));

// Pug за замовчуванням
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// Middleware
app.use(logRequests);

// Routes
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/articles", articlesRouter);

// Error handler
app.use(errorHandler);

module.exports = app;