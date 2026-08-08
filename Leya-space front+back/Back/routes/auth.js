import express from "express";

import {
    register,
    login,
    logout,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.get("/logout", logout);

router.get("/profile", (req, res) => {
    if (!req.isAuthenticated()) {
        return res.status(401).json({
            message: "Не авторизований",
        });
    }

    res.json({
        message: "Профіль користувача",
        user: req.user,
    });
});

export default router;