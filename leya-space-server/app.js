const express = require("express");

const logRequests = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const articlesRouter = require("./routes/articles");

const app = express();

app.use(express.json());


app.use(logRequests);


app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/articles", articlesRouter);

// Error 
app.use(errorHandler);

module.exports = app;