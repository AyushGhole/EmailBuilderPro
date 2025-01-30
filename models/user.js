const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
    default: "Mumbai",
  },
  state: {
    type: String,
    required: true,
    default: "Maharashtra",
  },
  zip: {
    type: Number,
  },
  Email: [
    {
      type: Schema.Types.ObjectId,
      ref: "Email",
    },
  ],
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("emailUser", UserSchema);
