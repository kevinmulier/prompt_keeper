const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const morgan = require("morgan");
const exphbs = require("express-handlebars");
const methodOverride = require("method-override");
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

// Method override
app.use(
  methodOverride(function (req, res) {
    if (req.body && typeof req.body === "object" && "_method" in req.body) {
      // look in urlencoded POST bodies and delete it
      let method = req.body._method;
      delete req.body._method;
      return method;
    }
  })
);

// Logging with morgan
if (process.env.NODE_ENV === "dev") {
  app.use(morgan("dev"));
}

// Handlebars Helpers
const { formatDate, toUpperCase, concatToLowerCase, editIcon, select } = require("./helpers/hbs");

// Handlebars
app.engine(".hbs", exphbs.engine({ helpers: { formatDate, toUpperCase, concatToLowerCase, editIcon, select }, defaultLayout: "main", extname: ".hbs" }));
app.set("view engine", ".hbs");

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

// Set global var
app.use(function (req, res, next) {
  res.locals.user = req.user || null;
  next();
});

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
