import {
    getUsers as getUsersFromDb,
    getUserById as getUserByIdFromDb,
    createUser as createUserInDb
} from "../services/users.js";

export const getUsers = async (req, res) => {
    const users = await getUsersFromDb();

    res.render("users", {
        users
    });
};

export const getUserById = async (req, res) => {
    const user = await getUserByIdFromDb(req.params.userId);

    if (!user) {
        return res.status(404).send("Користувача не знайдено");
    }

    res.render("user", {
        user
    });
};

export const createUser = async (req, res) => {
    const result = await createUserInDb(req.body);

    res.status(201).json(result);
};