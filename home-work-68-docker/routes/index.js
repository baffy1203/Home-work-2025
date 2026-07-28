const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Leya Space API працює 🚀");
});

module.exports = router;