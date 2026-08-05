import express from "express";

import validateUserInput from "../middleware/validateUser.js";

import {
    getUsers,
    getUserById,
    createUser,
} from "../controllers/usersController.js";

const router = express.Router();

router.get("/", getUsers);

router.get("/:userId", getUserById);

router.post("/", validateUserInput, createUser);

export default router;