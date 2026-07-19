const path = require("path");

const getArticles = (req, res) => {
  const articles = [
    {
      id: 1,
      title: "Перша стаття",
    },
    {
      id: 2,
      title: "Друга стаття",
    },
    {
      id: 3,
      title: "Третя стаття",
    },
  ];

  res.render(path.join(__dirname, "../views/articles.ejs"), {
    articles,
  });
};

const getArticleById = (req, res) => {
  const article = {
    id: req.params.articleId,
    title: "Перша стаття",
  };

  res.render(path.join(__dirname, "../views/article.ejs"), {
    article,
  });
};

module.exports = {
  getArticles,
  getArticleById,
};