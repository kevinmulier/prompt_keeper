const express = require("express");
const router = express.Router();
const { ensureAuth } = require("../middleware/auth");

const Prompt = require("../models/Prompt");

// Desc : Prompts gallery
// Route : GET /prompts/gallery
router.get("/gallery", ensureAuth, async (req, res) => {
  try {
    const prompts = await Prompt.find({ status: "public" }).populate("user").sort({ createdAt: -1 }).lean();
    res.render("prompts/gallery", {
      prompts,
      addButton: true,
    });
  } catch (err) {
    console.error(err);
    res.render("error/500");
  }
});

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

// Desc : Edit prompt page
// Route : GET /prompts/edit/:id
router.get("/edit/:id", ensureAuth, async (req, res) => {
  const prompt = await Prompt.findOne({
    _id: req.params.id,
  }).lean();

  if (!prompt) {
    return res.render("error/404");
  }

  if (prompt.user != req.user.id) {
    res.redirect("/prompts");
  } else {
    res.render("prompts/edit", {
      prompt,
    });
  }
});

module.exports = router;
