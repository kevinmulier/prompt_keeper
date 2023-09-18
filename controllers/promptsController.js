const Prompt = require("../models/Prompt");

exports.addPromptPage = (req, res) => {
  res.render("prompts/add");
};

exports.getGallery = async (req, res) => {
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
};

exports.getSinglePrompt = async (req, res) => {
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
};

exports.processNewPrompt = async (req, res) => {
  try {
    req.body.user = req.user.id;
    await Prompt.create(req.body);
    res.redirect("/dashboard");
  } catch (err) {
    console.error(err);
    res.render("error/500");
  }
};

exports.getEditPromptPage = async (req, res) => {
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
};

exports.updatePrompt = async (req, res) => {
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
};

exports.deletePrompt = async (req, res) => {
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
};

exports.getUserPrompts = async (req, res) => {
  try {
    const prompts = await Prompt.find({ user: req.params.userId, status: "public" }).populate("user").lean();

    return res.render("prompts/gallery", { prompts });
  } catch (err) {
    console.error(err);
    res.render("error/500");
  }
};
