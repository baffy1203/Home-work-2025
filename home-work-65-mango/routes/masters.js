import { Router } from "express";
import { getMasters, getMasterById } from "../services/masters.js";

const router = Router();

router.get("/", async (req, res) => {
    const masters = await getMasters();

    res.render("masters", {
        title: "Майстри",
        masters
    });
});

router.get("/:id", async (req, res) => {
    const master = await getMasterById(req.params.id);

    if (!master) {
        return res.status(404).send("Майстра не знайдено");
    }

    res.render("master", {
        title: master.name,
        master
    });
});

export default router;