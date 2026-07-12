const express = require("express");

const basicAuth = require("../middleware/auth");
const validateUserInput = require("../middleware/validateUser");

const {
  getUsers,
  getUserById,
  createUser,
} = require("../controllers/usersController");

const router = express.Router();

router.get("/", basicAuth, getUsers);

router.get("/:userId", basicAuth, getUserById);

router.post("/", validateUserInput, createUser);

module.exports = router;