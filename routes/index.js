const express = require("express");
const router = express.Router();
const { ensureAuth, ensureGuest } = require("../middleware/auth");

const Prompt = require("../models/Prompt");

// Desc : Login / Landing page
// Route : GET /
router.get("/", ensureGuest, (req, res) => {
  res.render("login", {
    layout: "login",
  });
});

// Desc : Dashboard
// Route : GET /dashboard
router.get("/dashboard", ensureAuth, async (req, res) => {
  try {
    const prompts = await Prompt.find({ user: req.user.id }).lean();
    res.render("dashboard", {
      name: req.user.firstName,
      prompts,
    });
  } catch (err) {
    console.error(err);
    res.render("error/500");
  }
});

module.exports = router;
