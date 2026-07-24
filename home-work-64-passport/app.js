import dotenv from "dotenv";
dotenv.config();

import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";
import session from "express-session";

import logger from "./middleware/logger.js";
import usersRouter from "./routes/users.js";
import articlesRouter from "./routes/articles.js";
import authRouter from "./routes/auth.js";
import themeRouter from "./routes/theme.js";
import errorHandler from "./middleware/errorHandler.js";
import passport from "./passport-config.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.use(logger);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
    })
);

app.use(passport.initialize());
app.use(passport.session());

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

export default app;