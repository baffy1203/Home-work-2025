const jwt = require("jsonwebtoken");

const SECRET_KEY = "mySecretKey";

exports.register = (req, res) => {
    const { username, password } = req.body;

    const token = jwt.sign(
        { username },
        SECRET_KEY,
        { expiresIn: "1h" }
    );

    res.cookie("token", token, {
        httpOnly: true,
    });

    res.status(201).json({
        message: "Користувач успішно зареєстрований",
        token,
    });
};

exports.login = (req, res) => {
    const { username, password } = req.body;

    const token = jwt.sign(
        { username },
        SECRET_KEY,
        { expiresIn: "1h" }
    );

    res.cookie("token", token, {
        httpOnly: true,
    });

    res.status(200).json({
        message: "Вхід успішний",
        token,
    });
};