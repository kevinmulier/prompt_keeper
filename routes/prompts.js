const express = require("express");
const router = express.Router();
const { ensureAuth, ensureGuest } = require("../middleware/auth");
const promptController = require("../controllers/promptsController");

// Desc : Add new prompt page
// Route : GET /prompts/add
router.get("/add", ensureAuth, promptController.addPromptPage);

// Desc : Prompts gallery
// Route : GET /prompts/gallery
router.get("/gallery", ensureAuth, promptController.getGallery);

// Desc : Get single prompt
// Route : GET /prompts/:id
router.get("/:id", ensureAuth, promptController.getSinglePrompt);

// Desc : Process new prompt
// Route : POST /prompts
router.post("/", ensureAuth, promptController.processNewPrompt);

// Desc : Edit prompt page
// Route : GET /prompts/edit/:id
router.get("/edit/:id", ensureAuth, promptController.getEditPromptPage);

// Desc : Update prompt
// Route : PUT /prompts/:id
router.put("/:id", ensureAuth, promptController.updatePrompt);

// Desc : Delete prompt
// Route : DELETE /prompts/:id
router.delete("/:id", ensureAuth, promptController.deletePrompt);

// Desc : User prompts
// Route : GET /prompts/user/:userId
router.get("/user/:userId", ensureAuth, promptController.getUserPrompts);

module.exports = router;
