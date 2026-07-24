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

export const getArticles = (req, res) => {
    res.render("articles", {
        articles,
    });
};

export const getArticleById = (req, res) => {
    const article = articles.find(
        (article) => article.id === Number(req.params.articleId)
    );

    if (!article) {
        return res.status(404).send("Статтю не знайдено");
    }

    res.render("article", {
        article,
    });
};