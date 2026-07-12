const getArticles = (req, res) => {
  res.json({
    message: "Список статей",
  });
};

const getArticleById = (req, res) => {
  res.json({
    message: `Стаття ${req.params.articleId}`,
  });
};

module.exports = {
  getArticles,
  getArticleById,
};