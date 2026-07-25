const users = [
    {
        id: 1,
        username: "Вікторія",
    },
    {
        id: 2,
        username: "Олена",
    },
    {
        id: 3,
        username: "Марія",
    },
];

export const getUsers = (req, res) => {
    res.render("users", {
        users,
    });
};

export const getUserById = (req, res) => {
    const user = users.find(
        (user) => user.id === Number(req.params.userId)
    );

    if (!user) {
        return res.status(404).send("Користувача не знайдено");
    }

    res.render("user", {
        user,
    });
};

export const createUser = (req, res) => {
    res.status(201).json({
        message: "Користувача успішно створено",
        user: req.body,
    });
};