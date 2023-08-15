const express = require("express");
const router = express.Router();

// Desc : Login / Landing page
// Route : GET /
router.get("/", (req, res) => {
  res.render("login");
});

// Desc : Dashboard
// Route : GET /dashboard
router.get("/dashboard", (req, res) => {
  res.render("dashboard");
});

module.exports = router;
