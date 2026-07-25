import { Router } from "express";
import {
    getMasters,
    getMasterById,
    createMaster,
    createManyMasters,
    updateMaster,
    updateManyMasters,
    replaceMaster,
    deleteMaster,
    deleteManyMasters,
    findMasters
} from "../services/masters.js";

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

router.post("/", async (req, res) => {
    const result = await createMaster(req.body);
    res.status(201).json(result);
});

router.post("/many", async (req, res) => {
    const result = await createManyMasters(req.body);
    res.json(result);
});

router.patch("/:id", async (req, res) => {
    const result = await updateMaster(req.params.id, req.body);
    res.json(result);
});

router.patch("/", async (req, res) => {
    const { filter, update } = req.body;
    const result = await updateManyMasters(filter, update);
    res.json(result);
});

router.put("/:id", async (req, res) => {
    const result = await replaceMaster(req.params.id, req.body);
    res.json(result);
});

router.delete("/:id", async (req, res) => {
    const result = await deleteMaster(req.params.id);
    res.json(result);
});

router.delete("/", async (req, res) => {
    const result = await deleteManyMasters(req.body);
    res.json(result);
});

router.get("/search/data", async (req, res) => {
    const result = await findMasters(
        {},
        {
            name: 1,
            specialization: 1,
            city: 1,
            _id: 0
        }
    );

    res.json(result);
});

export default router;