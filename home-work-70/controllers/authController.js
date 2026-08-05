import passport from "../passport-config.js";

export const register = (req, res) => {
    res.status(201).json({
        message: "Користувача успішно зареєстровано",
    });
};

export const login = (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
        if (err) {
            return next(err);
        }

        if (!user) {
            return res.status(401).json({
                message: info?.message || "Невірний логін або пароль",
            });
        }

        req.logIn(user, (err) => {
            if (err) {
                return next(err);
            }

            return res.status(200).json({
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