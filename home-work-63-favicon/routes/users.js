const express = require("express");

const validateUserInput = require("../middleware/validateUser");

const {
  getUsers,
  getUserById,
  createUser,
} = require("../controllers/usersController");

const router = express.Router();

router.get("/", getUsers);

router.get("/:userId", getUserById);

router.post("/", validateUserInput, createUser);

module.exports = router;