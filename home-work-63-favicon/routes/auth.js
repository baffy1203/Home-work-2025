const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");
const authJWT = require("../middleware/authJWT");

router.post("/register", authController.register);

router.post("/login", authController.login);

router.get("/profile", authJWT, (req, res) => {
    res.status(200).json({
        message: "Доступ дозволено",
        user: req.user,
    });
});

module.exports = router;