


  import express from "express";

export const articlesRouter = express.Router();

articlesRouter.route("/articles")
  .get((req, res) => {
    res.send("Get articles route");
  })
  .post((req, res) => {
    res.send("Post articles route");
  });

articlesRouter.route("/articles/:articleId")
  .get((req, res) => {
    res.send(`Get article by Id route: ${req.params.articleId}`);
  })
  .put((req, res) => {
    res.send(`Put article by Id route: ${req.params.articleId}`);
  })
  .delete((req, res) => {
    res.send(`Delete article by Id route: ${req.params.articleId}`);
  });