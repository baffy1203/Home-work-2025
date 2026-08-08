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
    findMasters,
    getMastersWithPagination,
    getMastersStatistics
} from "../controllers/mastersController.js";

const router = Router();

router.get("/", getMasters);

router.get("/page", (req, res) => {
    res.render("masters-pagination", {
        title: "Майстри"
    });
});

router.get("/api/list", getMastersWithPagination);

router.get("/statistics", getMastersStatistics);

router.get("/search/data", findMasters);

router.get("/:id", getMasterById);

router.post("/", createMaster);

router.post("/many", createManyMasters);

router.patch("/:id", updateMaster);

router.patch("/", updateManyMasters);

router.put("/:id", replaceMaster);

router.delete("/:id", deleteMaster);

router.delete("/", deleteManyMasters);

export default router;