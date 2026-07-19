const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");

const logger = require("./middleware/logger");
const usersRouter = require("./routes/users");
const articlesRouter = require("./routes/articles");
const authRouter = require("./routes/auth");
const themeRouter = require("./routes/theme");
const errorHandler = require("./middleware/errorHandler");

const app = express();

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.use(logger);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/users", usersRouter);
app.use("/articles", articlesRouter);
app.use("/auth", authRouter);
app.use("/", themeRouter);

app.get("/", (req, res) => {
    res.send(`
        <h1>Express Server працює!</h1>
        <ul>
            <li><a href="/users">Users</a></li>
            <li><a href="/articles">Articles</a></li>
        </ul>
    `);
});

app.use((req, res) => {
    res.status(404).send("404 | Page not found");
});

app.use(errorHandler);

module.exports = app;