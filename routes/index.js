const express = require("express");
const router = express.Router();

// Desc : Login / Landing page
// Route : GET /
router.get("/", (req, res) => {
  res.send("Login");
});

// Desc : Dashboard
// Route : GET /dashboard
router.get("/dashboard", (req, res) => {
  res.send("Dashboard");
});

module.exports = router;
