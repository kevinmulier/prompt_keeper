const express = require("express");
const router = express.Router();
const { ensureAuth } = require("../middleware/auth");

const Prompt = require("../models/Prompt");

// Desc : Add new prompt page
// Route : GET /prompts/add
router.get("/add", ensureAuth, (req, res) => {
  res.render("prompts/add");
});

// Desc : Process new prompt
// Route : POST /prompts
router.post("/", ensureAuth, async (req, res) => {
  try {
    req.body.user = req.user.id;
    await Prompt.create(req.body);
    res.redirect("/dashboard");
  } catch (err) {
    console.error(err);
    res.render("error/500");
  }
});

module.exports = router;
