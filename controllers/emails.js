// Requiring the assets
const emailUser = require("../models/user");
const Email = require("../models/emails");

// Rendering the mails in the users
module.exports.renderMail = async (req, res) => {
  const mailId = await emailUser.findById(req.params.id);

  let sendMail = new Email(req.body);
  sendMail.owner = req.body._id;

  await mailId.Email.push(sendMail);

  await sendMail.save();
  await mailId.save();
  req.flash("success", "Email Submitted Successfully!!");
  res.redirect("/");
};

// Display the clicked mails details
module.exports.displayEmail = async (req, res) => {
  const mailId = await Email.findById(req.params.id);
  res.render("display.ejs", { mailId });
};

// Deleting the routes
module.exports.deleteRoute = async (req, res) => {
  let { id } = req.params;
  let deleteEmail = await Email.findByIdAndDelete(id);
  console.log("Delete Mails ID: ", deleteEmail);
  req.flash("success", "Deleted Successfully!!");
  res.redirect("/");
};

// Displaying the emails in the inbox
module.exports.renderingMails = (req, res) => {
  res.render("mails.ejs");
};
