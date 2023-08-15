const express = require("express");
const dotenv = require("dotenv");

// Load config
dotenv.config({ path: "./config/config.env" });

const app = express();

const PORT = process.env.PORT;

app.listen();
