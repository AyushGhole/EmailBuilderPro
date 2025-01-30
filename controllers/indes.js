// Requiring the mandate
const { populate } = require("dotenv");
const emailUser = require("../models/user");
const Email = require("../models/emails");

// Main Page Rendering FrontView
module.exports.renderMainPage = (req, res) => {
  res.render("index.ejs");
};

// Rendering Login Page
module.exports.renderLoginPage = (req, res) => {
  res.render("login.ejs");
};

// Login Users
module.exports.loginUser = async (req, res) => {
  let redirectUrl = res.locals.redirectUrl || "/";
  console.log("RedirectUrl", redirectUrl);
  req.flash("success", "Welcome to Email Builder Pro!!");
  res.redirect(redirectUrl);
};

// Rendering SignUp Page
module.exports.renderSignUpPage = (req, res) => {
  res.render("signup.ejs");
};

// Sign Up Page
module.exports.singUpUser = async (req, res) => {
  try {
    let { username, email, password } = req.body;
    const newUser = new emailUser({ email, username });
    console.log("newUsers : ", newUser);
    const registeredUser = await emailUser.register(newUser, password);
    console.log("Registered Users : ", registeredUser);
    req.flash("success", "New User created Successfully !!");
    res.redirect("/");
  } catch (err) {
    console.log(err.message);
    req.flash("error", err.message);
    res.redirect("/signup");
  }
};

// Logout route
module.exports.logOutRoute = (req, res, next) => {
  req.logOut((err) => {
    if (err) {
      return next(err);
    } else {
      req.flash("success", "You logged out successfully!!");
      res.redirect("/");
    }
  });
};

// Sending Form Rendeing
module.exports.sentForm = (req, res) => {
  res.render("sent.ejs");
};
// Sending details to the databases
module.exports.SendingDetails = async (req, res) => {
  try {
    let { Toemail, Subject, body } = req.body;
    const newUser = new Email({ Toemail, Subject, body });
    console.log("NewEmails : ", newUser);
    await newUser.save();
    res.redirect("/");
  } catch (err) {
    console.log(err.message);
    req.flash("error", err.message);
  }
};

// Rendering Mails
module.exports.renderingMails = (req, res) => {
  res.render("main.ejs");
};

// Tracking details
module.exports.getTrackDetails = async (req, res) => {
  const { id } = req.params;
  const emails = await emailUser
    .findById(id)
    .populate({ path: "Email", populate: { path: "Subject" } });
  console.log("mailId tracking", emails);
  res.render("trck.ejs", { emails });
};
