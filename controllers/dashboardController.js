const Prompt = require("../models/Prompt");

exports.getLoginPage = (req, res) => {
  res.render("login", {
    layout: "login",
  });
};

exports.getDashboard = async (req, res) => {
  try {
    const prompts = await Prompt.find({ user: req.user.id }).sort({ createdAt: -1 }).lean();
    res.render("dashboard", {
      name: req.user.firstName,
      prompts,
      addButton: true,
    });
  } catch (err) {
    console.error(err);
    res.render("error/500");
  }
};
