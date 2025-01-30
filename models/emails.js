// Requiring
const mongoose = require("mongoose");

// Schema
const Schema = mongoose.Schema;

// Schema Declaration
const UserSchema = new Schema({
  Toemail: {
    type: String,
    required: true,
  },
  Subject: {
    type: String,
  },
  body: {
    type: String,
    required: true,
    default: "EMPTY MESSAGE",
  },
});

// exporting
module.exports = mongoose.model("Email", UserSchema);
