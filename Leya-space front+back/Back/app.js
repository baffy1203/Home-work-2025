import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";
import session from "express-session";
import cors from "cors";
import dotenv from "dotenv";

import logger from "./middleware/logger.js";
import passport from "./passport-config.js";

import usersRouter from "./routes/users.js";
import articlesRouter from "./routes/articles.js";
import authRouter from "./routes/auth.js";
import mastersRouter from "./routes/masters.js";
import themeRouter from "./routes/theme.js";

import errorHandler from "./middleware/errorHandler.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
);

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

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.use("/users", usersRouter);
app.use("/articles", articlesRouter);
app.use("/auth", authRouter);
app.use("/masters", mastersRouter);
app.use("/", themeRouter);

app.get("/", (req, res) => {
    res.json({
        message: "Leya Space API працює",
    });
});

app.use(errorHandler);

app.use((req, res) => {
    res.status(404).json({
        message: "Route not found",
    });
});

export default app;