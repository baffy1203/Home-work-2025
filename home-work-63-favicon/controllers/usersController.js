const getUsers = (req, res) => {
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

  res.render("users", {
    users,
  });
};

const getUserById = (req, res) => {
  const user = {
    id: req.params.userId,
    username: "Вікторія",
  };

  res.render("user", {
    user,
  });
};

const createUser = (req, res) => {
  res.json({
    message: "Користувача успішно створено",
    user: req.body,
  });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
};