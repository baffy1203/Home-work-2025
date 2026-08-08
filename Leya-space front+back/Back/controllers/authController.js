import passport from "../passport-config.js";
import User from "../models/User.js";

export const register = async (req, res, next) => {
    try {
        const {
            username,
            email,
            password,
            phone,
            city,
        } = req.body;

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: "Користувач вже існує",
            });
        }

        const user = await User.create({
            username,
            email,
            password,
            phone,
            city,
        });

        res.status(201).json({
            message: "Користувача успішно зареєстровано",
            user,
        });
    } catch (error) {
        next(error);
    }
};

export const login = (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
        if (err) {
            return next(err);
        }

        if (!user) {
            return res.status(401).json({
                message: info?.message || "Невірний email або пароль",
            });
        }

        req.logIn(user, (err) => {
            if (err) {
                return next(err);
            }

            return res.json({
                message: "Вхід успішний",
                user,
            });
        });
    })(req, res, next);
};

export const logout = (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }

        res.json({
            message: "Вихід успішний",
        });
    });
};