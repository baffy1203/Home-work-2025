import express from "express";

import {
    getArticles,
    getArticleById,
} from "../controllers/articlesController.js";

const router = express.Router();

router.get("/", getArticles);

router.get("/:articleId", getArticleById);

export default router;