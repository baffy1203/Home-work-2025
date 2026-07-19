const jwt = require("jsonwebtoken");

const SECRET_KEY = "mySecretKey";

const authJWT = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({
            message: "Токен відсутній",
        });
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(403).json({
            message: "Недійсний токен",
        });
    }
};

module.exports = authJWT;