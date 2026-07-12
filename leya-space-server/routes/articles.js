const express = require("express");

const articleAccess = require("../middleware/articleAccess");

const {
  getArticles,
  getArticleById,
} = require("../controllers/articlesController");

const router = express.Router();

router.get("/", articleAccess, getArticles);

router.get("/:articleId", articleAccess, getArticleById);

module.exports = router;