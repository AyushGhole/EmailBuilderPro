// ENV Declarations
if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

// Declaring cloud databases
const dbUrl = process.env.ATLAS_URL;

// Package Declarations
const express = require("express");
const app = express();
const ejsMate = require("ejs-mate");
const router = require("./route/indes");
const path = require("path");
const methodOverride = require("method-override");
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const session = require("express-session");
const emailUser = require("./models/user");
const passport = require("passport"); //passport declaration
const LocalStrategy = require("passport-local"); //passport-local declaration

// MongoDb Store connection
const Store = MongoStore.create({
  mongoUrl: dbUrl,
  crypto: {
    secret: process.env.SECRET,
  },
  touchAfter: 24 * 3600,
});

Store.on("error", (err) => {
  console.log("Error in MongoDB session store:", err);
});

// Session declarations
const sessionOptions = {
  store: Store,
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000, // Fixed cookie expiration calculation
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
};

// Middlewares
app.use(express.urlencoded({ extended: true })); // Parse form data
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views")); // Fixed dirname
app.use(flash());
app.use(session(sessionOptions));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(emailUser.authenticate()));
passport.serializeUser(emailUser.serializeUser());
passport.deserializeUser(emailUser.deserializeUser());

// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, "public"))); // Fixed dirname

// MongoDb Connection
mongoose
  .connect(dbUrl)
  .then(() => {
    console.log("Connection Successfull");
  })
  .catch((err) => {
    console.log("connection error", err);
  });

// Current User Declaration
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user;
  next();
});

// router rotues
app.use("/", router);

// port declarations
const port = 8080;
//routes
app.listen(port, (req, res) => {
  console.log(`Server is listening to the ${port}`);
});
