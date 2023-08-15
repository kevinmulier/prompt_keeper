const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

// Loading config path
dotenv.config({ path: "./config/config.env" });

connectDB();

const app = express();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`The server is now operational in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
