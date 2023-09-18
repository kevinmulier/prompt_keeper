const express = require("express");
const router = express.Router();
const { ensureAuth, ensureGuest } = require("../middleware/auth");
const dashboardController = require("../controllers/dashboardController");

// Desc : Login / Landing page
// Route : GET /
router.get("/", ensureGuest, dashboardController.getLoginPage);

// Desc : Dashboard
// Route : GET /dashboard
router.get("/dashboard", ensureAuth, dashboardController.getDashboard);

module.exports = router;
