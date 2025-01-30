// Requiring the Field
const express = require("express");
const router = express.Router();
const usercontrollers = require("../controllers/indes");
const { savedRedirectUrl } = require("../middleware");
const passport = require("passport");
const emailControllers = require("../controllers/emails");

// main route
router.route("/").get(usercontrollers.renderMainPage);

// login routesa
router
  .route("/login")
  .get(usercontrollers.renderLoginPage)
  .post(
    savedRedirectUrl,
    passport.authenticate("local", {
      failureRedirect: "/",
    }),
    usercontrollers.loginUser
  );

// signUp route
router
  .route("/signup")
  .get(usercontrollers.renderSignUpPage)
  .post(usercontrollers.singUpUser);

//  Logout route
router.get("/logout", usercontrollers.logOutRoute);

// Sent Form Rendering
router
  .route("/sent/:id")
  .get(usercontrollers.sentForm)
  .post(usercontrollers.SendingDetails);

// Emails Sending
router.route("/sent/:id/mails").post(emailControllers.renderMail);

// Email Tracking
router.route("/track/:id").get(usercontrollers.getTrackDetails);

// Display the  mail body
router
  .route("/display/:id")
  .get(emailControllers.displayEmail)
  .delete(emailControllers.deleteRoute);

// Displaying the inbox mails
router.route("/mail").get(emailControllers.renderingMails);

// Exporting the route
module.exports = router;
