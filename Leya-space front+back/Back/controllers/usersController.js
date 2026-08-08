import {
    getUsers as getUsersFromDb,
    getUserById as getUserByIdFromDb,
    createUser as createUserInDb,
    updateUser as updateUserInDb,
} from "../services/users.js";

export const getUsers = async (req, res) => {
    const users = await getUsersFromDb();

    res.render("users", {
        users,
    });
};

export const getUserById = async (req, res) => {
    const user = await getUserByIdFromDb(req.params.userId);

    if (!user) {
        return res.status(404).send("Користувача не знайдено");
    }

    res.json(user);
};

export const createUser = async (req, res) => {
    const result = await createUserInDb(req.body);

    res.status(201).json(result);
};

export const updateUser = async (req, res) => {
    const user = await updateUserInDb(req.params.userId, req.body);

    if (!user) {
        return res.status(404).json({
            message: "Користувача не знайдено",
        });
    }

    res.json(user);
};