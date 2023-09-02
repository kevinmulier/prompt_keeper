const express = require("express");
const router = express.Router();
const { ensureAuth, ensureGuest } = require("../middleware/auth");

const Prompt = require("../models/Prompt");

// Desc : Add new prompt page
// Route : GET /prompts/add
router.get("/add", ensureAuth, (req, res) => {
  res.render("prompts/add");
});

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

// Desc : Get single prompt
// Route : GET /prompts/:id
router.get("/:id", ensureAuth, async (req, res) => {
  try {
    let prompt = await Prompt.findById(req.params.id).populate("user").lean();

    if (!prompt) {
      return res.render("error/404");
    }

    if (prompt.user._id != req.user.id && prompt.status == "private") {
      res.redirect("/prompts/gallery");
    } else {
      res.render("prompts/show", {
        prompt,
      });
    }
  } catch (err) {
    console.error(err);
    res.render("error/500");
  }
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
  try {
    const prompt = await Prompt.findOne({
      _id: req.params.id,
    }).lean();

    if (!prompt) {
      return res.render("error/404");
    }

    if (prompt.user._id != req.user.id) {
      res.redirect("/prompts/gallery");
    } else {
      res.render("prompts/edit", {
        prompt,
      });
    }
  } catch (err) {
    console.error(err);
    res.render("error/500");
  }
});

// Desc : Update prompt
// Route : PUT /prompts/:id
router.put("/:id", ensureAuth, async (req, res) => {
  try {
    let prompt = await Prompt.findById(req.params.id).lean();

    if (!prompt) {
      return res.render("error/404");
    }

    if (prompt.user != req.user.id) {
      res.redirect("/dashboard");
    } else {
      prompt = await Prompt.findOneAndUpdate({ _id: req.params.id }, req.body, {
        new: true,
        runValidators: true,
      });
      res.redirect("/dashboard");
    }
  } catch (err) {
    console.error(err);
    res.render("error/500");
  }
});

// Desc : Delete prompt
// Route : DELETE /prompts/:id
router.delete("/:id", ensureAuth, async (req, res) => {
  try {
    let prompt = await Prompt.findById(req.params.id).lean();

    if (!prompt) {
      return res.render("error/404");
    }

    if (prompt.user != req.user.id) {
      res.redirect("/dashboard");
    } else {
      await Prompt.deleteOne({ _id: req.params.id });
      res.redirect("/dashboard");
    }
  } catch (err) {
    console.error(err);
    res.render("error/500");
  }
});

// Desc : User prompts
// Route : GET /prompts/user/:userId
router.get("/user/:userId", ensureAuth, async (req, res) => {
  try {
    const prompts = await Prompt.find({ user: req.params.userId, status: "public" }).populate("user").lean();

    return res.render("prompts/gallery", { prompts });
  } catch (err) {
    console.error(err);
    res.render("error/500");
  }
});

module.exports = router;
