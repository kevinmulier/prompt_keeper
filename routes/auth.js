const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// Desc : Auth (Google)
// Route : GET /auth/google
router.get("/google", authController.authenticateGoogle);

// Desc : Google auth callback
// Route : GET /auth/google/callback
router.get("/google/callback", authController.googleAuthCallback);

// Desc : Logout
// Route : /auth/logout
router.get("/logout", authController.logout);

module.exports = router;
