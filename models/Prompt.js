const mongoose = require("mongoose");

const PromptSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "public",
    enum: ["public", "private"],
  },
  ai: {
    type: String,
    default: "ChatGPT",
    enum: ["ChatGPT", "Bard", "Claude 2", "Llama 2", "Midjourney", "Stable Diffusion", "DALL-E 2"],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Prompt", PromptSchema);
