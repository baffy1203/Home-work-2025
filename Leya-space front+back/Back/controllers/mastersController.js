import {
    getMasters as getMastersFromDb,
    getMasterById as getMasterByIdFromDb,
    createMaster as createMasterInDb,
    createManyMasters as createManyMastersInDb,
    updateMaster as updateMasterInDb,
    updateManyMasters as updateManyMastersInDb,
    replaceMaster as replaceMasterInDb,
    deleteMaster as deleteMasterInDb,
    deleteManyMasters as deleteManyMastersInDb,
    findMasters as findMastersInDb,
    getMastersWithPagination as getMastersWithPaginationFromDb,
    getMastersStatistics as getMastersStatisticsFromDb
} from "../services/masters.js";

export const getMasters = async (req, res) => {
    const masters = await getMastersFromDb();

    res.render("masters", {
        title: "Майстри",
        masters
    });
};

export const getMasterById = async (req, res) => {
    const master = await getMasterByIdFromDb(req.params.id);

    if (!master) {
        return res.status(404).send("Майстра не знайдено");
    }

    res.render("master", {
        title: master.name,
        master
    });
};

export const createMaster = async (req, res) => {
    const result = await createMasterInDb(req.body);

    res.status(201).json(result);
};

export const createManyMasters = async (req, res) => {
    const result = await createManyMastersInDb(req.body);

    res.json(result);
};

export const updateMaster = async (req, res) => {
    const result = await updateMasterInDb(req.params.id, req.body);

    res.json(result);
};

export const updateManyMasters = async (req, res) => {
    const { filter, update } = req.body;

    const result = await updateManyMastersInDb(filter, update);

    res.json(result);
};

export const replaceMaster = async (req, res) => {
    const result = await replaceMasterInDb(req.params.id, req.body);

    res.json(result);
};

export const deleteMaster = async (req, res, next) => {
    try {
        const result = await deleteMasterInDb(req.params.id);

        res.json(result);
    } catch (error) {
        next(error);
    }
};

export const deleteManyMasters = async (req, res) => {
    const result = await deleteManyMastersInDb(req.body);

    res.json(result);
};

export const findMasters = async (req, res) => {
    const result = await findMastersInDb(
        {},
        {
            name: 1,
            specialization: 1,
            city: 1,
            _id: 0
        }
    );

    res.json(result);
};

export const getMastersWithPagination = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage) || 5;

    const result = await getMastersWithPaginationFromDb(page, perPage);

    res.json(result);
};

export const getMastersStatistics = async (req, res) => {
    const result = await getMastersStatisticsFromDb();

    res.json(result);
};