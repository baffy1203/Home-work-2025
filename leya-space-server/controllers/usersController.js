const getUsers = (req, res) => {
  res.json({
    message: "Список користувачів",
  });
};

const getUserById = (req, res) => {
  res.json({
    message: `Користувач ${req.params.userId}`,
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