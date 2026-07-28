import express from "express";

const router = express.Router();

router.post("/theme", (req, res) => {
    const { theme } = req.body;

    res.cookie("theme", theme, {
        maxAge: 24 * 60 * 60 * 1000,
    });

    res.json({
        message: "Тему збережено",
        theme,
    });
});

router.get("/theme", (req, res) => {
    const theme = req.cookies.theme || "light";

    res.json({
        theme,
    });
});

export default router;