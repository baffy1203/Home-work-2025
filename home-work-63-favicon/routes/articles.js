const express = require("express");

const {
  getArticles,
  getArticleById,
} = require("../controllers/articlesController");

const router = express.Router();

router.get("/", getArticles);

router.get("/:articleId", getArticleById);

module.exports = router;