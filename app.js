const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const morgan = require("morgan");
const exphbs = require("express-handlebars");
const Handlebars = exphbs.create().handlebars;
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const connectDB = require("./config/db");

// Loading config path
dotenv.config({ path: "./config/config.env" });

// Config Passport
require("./config/passport")(passport);

connectDB();

const app = express();

// JSON body parse middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Logging with morgan
if (process.env.NODE_ENV === "dev") {
  app.use(morgan("dev"));
}

// Handlebars
app.engine(".hbs", exphbs.engine({ defaultLayout: "main", extname: ".hbs" }));
app.set("view engine", ".hbs");

// Handlebars date helper
Handlebars.registerHelper("formatDate", function (date) {
  return new Date(date).toLocaleDateString("en-US").split("/").slice(0, 2).join("/");
});

// Sessions middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI }),
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Static folder
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/", require("./routes/index"));
app.use("/auth", require("./routes/auth"));
app.use("/prompts", require("./routes/prompts"));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`The server is now operational in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
