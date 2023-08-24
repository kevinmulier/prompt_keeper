const express = require("express");
const router = express.Router();
const { ensureAuth } = require("../middleware/auth");

const Prompt = require("../models/Prompt");

// Desc : Add page
// Route : GET /prompts/add
router.get("/add", ensureAuth, (req, res) => {
  res.render("prompts/add");
});

module.exports = router;
